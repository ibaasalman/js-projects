export default class Platform {
  constructor(ctx, x, y, w, h) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.gap = 2;
    this.platformImg = document.getElementById("platform");
    this.platformlongImg = document.getElementById("platformlong");
  }
  draw() {
    if(this.width<1000){
      this.ctx.drawImage(this.platformImg,this.x, this.y, this.width, this.height);
    }
    else{
      this.ctx.drawImage(this.platformlongImg,this.x, this.y, this.width, this.height);
    }
    
  }
  update() {
    this.draw();
  }
}
