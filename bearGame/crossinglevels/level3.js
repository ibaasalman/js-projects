import Trunk from "./trunk.js";
import Player from "./player.js";
import BaseLevel from "./../baseLevel.js";
export default class Game extends BaseLevel{
  constructor(canvas, context, nextLevelOrWindow) {
    super();
    this.canvas = canvas;
    this.ctx = context;
    this.width = canvas.width;
    this.height = canvas.height;
    this.life = 5;
    this.score = 0;
    this.myTrunks = [];
    this.nextLevelOrWindow = nextLevelOrWindow;
    
    this.riverHeight = this.height - 30;
    this.trunkGap = 10;
    this.numOfTrunks = Math.floor(
      this.riverHeight / (20 + this.trunkGap)
    );
    this.trunkWidth = 80 ;
    this.trunkHeight = 20 ;
    this.dir = 1;
    for (let i = 1; i < this.numOfTrunks; i++) {
      const speed = (Math.random() + 0.5) * 1.4;
      let x = 1;
      this.dir = -this.dir;
      this.myTrunks.push(
        new Trunk(
          this.ctx,
          this.width,
          this.height,
          this.width/4,
          i * 20 + i * this.trunkGap + 5,
          i,
          speed,
          this.trunkWidth,
          this.trunkHeight,
          this.dir
        ),
        new Trunk(
          this.ctx,
          this.width,
          this.height,
          this.width/4 + this.trunkWidth+20,
          i * 20 + i * this.trunkGap + 5,
          i,
          speed,
          this.trunkWidth,
          this.trunkHeight,
          this.dir
        )
      );
    }
    this.myPlayer = new Player(
      this.ctx,
      this.width,
      this.height,
      this.life,
      this.score,
      this.myTrunks,
      this.nextLevelOrWindow
    );
  }

  btnBClick() {
    this.myPlayer.jump();
  }
  btnRightClick() {
    this.myPlayer.right();
  }
  btnLeftClick() {
    this.myPlayer.left();
  }

  render() {
    this.ctx.drawImage(document.getElementById("river-bg"), 0, 0);
    if (this.life > 0) {
      this.myTrunks.forEach((trunk) => {
        trunk.update();
      });

      this.myPlayer.update(this.myTrunks);
    } else {
      alert("Game Over , Your Score is [ " + this.score + " ]");
    }
  }
}
