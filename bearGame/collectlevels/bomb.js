export default class Boomb {
  constructor(ctx, cwidth, cheight) {
    this.ctx = ctx;
    this.width = 21;
    this.height = 25;
    this.cwidth = cwidth;
    this.cheight = cheight;
    this.randomPosition();
    this.gap = 2;
    this.bombImg = document.getElementById("bomb");
    this.bombFramesCount = Math.round(this.bombImg.width / this.width) - 1;
    this.bombCurrentFrame = 2;
    this.bombTimer = 0;
  }
  draw() {
    this.bombTimer++;
    if(this.bombTimer >= 3){
      this.bombTimer = 0;
      if(this.bombCurrentFrame == this.bombFramesCount){
        this.bombCurrentFrame = 0;
      }else{
        this.bombCurrentFrame++;
      }
    }
    this.ctx.drawImage(this.bombImg,this.bombCurrentFrame*this.width,0,this.width,this.height, this.x, this.y, this.width, this.height);
  }
  update() {
    this.gravity();
    this.draw();
  }
  gravity() {
    if (this.y + this.height < this.cheight) {
      this.y += this.speed;
    }
  }
  relocate() {
    this.randomPosition();
  }
  randomPosition = () => {
    this.y = -this.height - 20;
    this.speed = (Math.random() + 0.4)*3;
    this.x = Math.random() * (this.cwidth - this.width);
  };
}
