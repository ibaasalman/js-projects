import Apple from './apple.js';
import Boomb  from './bomb.js';
import Player from './player.js';
import BaseLevel from "./../baseLevel.js";
export default class Game extends BaseLevel{
    constructor(canvas, context ,nextLevelOrWindow) {
      super();
      this.canvas = canvas;
      this.ctx = context;
      this.width = canvas.width;
      this.height = canvas.height;
      this.life=5;
      this.score=0;
      this.goal = 25;
      this.myPlayer = new Player(this.ctx, this.width, this.height,this.life,this.score , this.goal,nextLevelOrWindow);
      this.myApples = [];
      this.boombs = [];
      this.nextLevelOrWindow = nextLevelOrWindow;
      this.updateScore = (newScore)=>{
        this.score = newScore;
      }
      for (let i = 0; i < 4; i++) {
        this.myApples.push(
          new Apple(this.ctx, this.width, this.height)
        );
      }
      for (let i = 0; i < 2; i++) {
        this.boombs.push(
          new Boomb(this.ctx, this.width, this.height)
        );
      }
    
    };

    btnRightClick() {
      this.myPlayer.moveRight();
    }
    btnLeftClick() {
      this.myPlayer.moveLeft();
    };
    
    render() {
      this.ctx.drawImage(document.getElementById("apple-bg"),0,0);
      
      this.myPlayer.update(this.myApples,this.boombs);
      if(this.life>0){
      this.myApples.forEach((apple) => {
        apple.update();
      });
      this.boombs.forEach((boomb) => {
        boomb.update();
      });
      
    }

    else{
      alert("Game Over , Your Score is [ "+this.score+" ]")
    }
    }
  }
  
  