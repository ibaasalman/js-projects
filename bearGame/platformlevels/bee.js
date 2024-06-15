export default class Bee {
  constructor(ctx, x, y, w, h) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 22;
    this.height = 18;
    this.beeImg = document.getElementById("bee");
    this.BeeCurrentFrame = 0;
    this.position = x;
    this.space = 80;
    this.BeeDir = false;
    this.BeeframesCount = Math.round(this.beeImg.width / this.width);
    this.hover = 0;
    this.beeY = this.y
  }
  draw() {
    this.hover++;
    if(this.hover > 10){
      this.beeY  = this.y+2 
    }
    else{
      this.beeY = this.y 
    }
    if(this.hover == 20){
      this.hover=0
    }


    this.ctx.save();
    if (this.BeeDir) {
      this.ctx.drawImage(
        this.beeImg,
        this.width * this.BeeCurrentFrame,
        0,
        this.width,
        this.height,
        this.position,
        this.beeY,
        this.width,
        this.height
      );
    } else {
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.beeImg,
        this.width * this.BeeCurrentFrame,
        0,
        this.width,
        this.height,
        -this.position - this.width,
        this.beeY,
        this.width,
        this.height
      );
    }

    this.ctx.restore();
  }
  update() {
    this.draw();
    this.BeeCurrentFrame += 1;
    if (this.BeeCurrentFrame >= this.BeeframesCount) {
      this.BeeCurrentFrame = 0;
    }

    if(this.BeeDir == false && this.position < this.x + this.space){
        this.position += 3;
    }
    else if(this.BeeDir == false && this.position >= this.x + this.space){
        this.BeeDir = true;
    }

    if(this.BeeDir == true && this.position > this.x){
        this.position -= 3;
    }
    else if(this.BeeDir == true && this.position <= this.x){
        this.BeeDir = false;
    }

  }
}
