import Player from "./player.js";
import Platform from "./platform.js";
import Bee from "./bee.js";
import mapPiece from "./mapPiece.js";
import baseLevel from "./../baseLevel.js";
import Screws from "./screws.js";

export default class Game extends baseLevel{
  constructor(canvas, context , nextLevelOrWindow) {
    super();
    this.canvas = canvas;
    this.ctx = context;
    this.width = canvas.width;
    this.height = canvas.height;
    this.life = 5;
    this.mapsCollected = 0;
    this.score = 0;
    this.bgx = 0;
    this.bgxTree = 0;
    this.play = true;
    this.nextLevelOrWindow = nextLevelOrWindow;
    //create new platforms
    this.myPlatforms = [];
    //set up the level design by creating platforms with x,y coordinate and width,height
    this.platforms = [
      { x: -10, y: this.height - 20, w: 2000, h: 50 },
      { x: 100, y: this.height - 83, w: 100, h: 20 },
      { x: 400, y: this.height - 40, w: 80, h: 20 },
      { x: 430, y: this.height - 60, w: 50, h: 20 },
      { x: 550, y: this.height - 40, w: 80, h: 20 },
      { x: 550, y: this.height - 60, w: 50, h: 20 },
      { x: 850, y: this.height - 83, w: 100, h: 20 },
      { x: 1500, y: this.height - 60, w: 50, h: 20 },
      { x: 1580, y: this.height - 80, w: 50, h: 20 },
      { x: 1660, y: this.height - 100, w: 50, h: 20 },
    ];

    this.platforms.forEach(({ x, y, w, h }) => {
      this.myPlatforms.push(new Platform(this.ctx, x, y, w, h));
    });

    //create the bees
    this.myBees = [];
    this.bees = [
      { x: 100, y: this.height - 50 },
      { x: 850, y: this.height - 50 },
    ];
    this.bees.forEach(({ x, y }) => {
      this.myBees.push(new Bee(this.ctx, x, y));
    });

    //create the mapPiece
    this.mymapPiece = [];
    this.mapPiece = [
      { x: 150, y: this.height - 115 },
      { x: 565, y: this.height - 90 },
      { x: 1000, y: this.height - 50 },
      { x: 1300, y: this.height - 50 },
      { x: 1685, y: this.height - 130 },
      { x: 1800, y: this.height - 50 },
    ];
    this.mapPiece.forEach(({ x, y }) => {
      this.mymapPiece.push(new mapPiece(this.ctx, x, y));
    });

    this.myScrews = [];
    this.screws = [
      { x: 495, y: this.height - 35 },
      { x: 1500, y: this.height - 35 },
      { x: 1550, y: this.height - 35 },
      { x: 1600, y: this.height - 35 },
      { x: 1650, y: this.height - 35 },
      { x: 1700, y: this.height - 35 },
    ]
    this.screws.forEach(({ x, y }) => {
      this.myScrews.push(new Screws(this.ctx, x, y));
    });

    //create the new player and pass platforms to it
    this.myPlayer = new Player(
      this.ctx,
      this.width,
      this.height,
      this.life,
      this.score,
      this.myPlatforms,
      this.myBees,
      this.mymapPiece,
      this.myScrews
    );

  }


  right() {
    if (this.myPlayer.detectCollisions(this.myPlatforms) != 1) {
      this.myPlayer.moveRight();
      this.bgx -= 0.5;
      this.bgxTree -= 1;
    }
  }
  left() {
    if (this.myPlayer.detectCollisions(this.myPlatforms) != -1) {
      this.myPlayer.moveLeft();
      this.bgx += 0.5;
      this.bgxTree += 1;
    }
  }
  jump() {
    this.myPlayer.jump();
  }
  bg() {
    this.ctx.drawImage(document.getElementById("bg"), this.bgx - 287, 0);
    this.ctx.drawImage(document.getElementById("bg"), this.bgx, 0);
    this.ctx.drawImage(document.getElementById("bg"), this.bgx + 287, 0);

    this.ctx.drawImage(
      document.getElementById("bgTrees"),
      this.bgxTree - 287,
      150
    );
    this.ctx.drawImage(document.getElementById("bgTrees"), this.bgxTree, 150);
    this.ctx.drawImage(
      document.getElementById("bgTrees"),
      this.bgxTree + 287,
      150
    );

    //288 is bg img width
    if (this.bgx == -288 || this.bgx == 288) {
      this.bgx = 0;
    }
    if (this.bgxTree == -288 || this.bgxTree == 288) {
      this.bgxTree = 0;
    }
  }

  HandleMovment() {
    if (this.movement.right == true) {
      this.right();
    }
    if (this.movement.left == true) {
      this.left();
    }
    if (this.movement.jump == true) {
      this.jump();
    }
  }

  render() {
    this.bg();

    if (this.play && this.life > 0) {
      this.HandleMovment();
      this.myPlatforms.forEach((platform) => {
        platform.update();
      });

      this.myPlayer.update(
        this.life,
        (newlife) => {
          this.life = newlife;
          if (this.life == 0) {
            this.play = false;
          }
        },
        this.platforms,
        this.bees,
        this.mapPiece,
        this.screws,
        this.mapsCollected,
        () => {
          this.mapsCollected++;
          if (this.mapsCollected == 6) {
            A_levelUp();
            this.nextLevelOrWindow();
          }
        }
      );

      this.myBees.forEach((bee) => {
        bee.update();
      });

      this.myScrews.forEach((screws) => {
        screws.update();
      });

      this.mymapPiece.forEach((map) => {
        map.update();
      });
    } else {
      A_fail();
      this.life  = 5;
      this.mapsCollected = 0;
      this.mymapPiece.forEach(map=>{
        map.touched = false;
      })
      this.myPlayer = new Player(
        this.ctx,
        this.width,
        this.height,
        this.life,
        this.score,
        this.myPlatforms,
        this.myBees,
        this.mymapPiece,
        this.myScrews
      );
      this.play = true;
    }
  }
}
