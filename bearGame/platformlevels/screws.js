export default class Screws {
    constructor(ctx, x, y) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.width = 38;
      this.height = 17;
      this.ScrewsImg = document.getElementById("screws");
    }
    draw() {
        this.ctx.drawImage(this.ScrewsImg,this.x, this.y, this.width, this.height);
    }
    update() {
      this.draw(); 
    }
  }
  