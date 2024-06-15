export default class Trunk {
  constructor(
    ctx,
    cwidth,
    cheight,
    x,
    y,
    o,
    speed,
    trunkWidth,
    trunkHeight,
    dir
  ) {
    this.ctx = ctx;
    this.width = trunkWidth;
    this.height = trunkHeight;
    this.cwidth = cwidth;
    this.cheight = cheight;
    this.gap = 2;
    this.y = y;
    this.x = x;
    this.order = o;
    this.step = speed;
    this.dir = dir;
    this.trunkImg = document.getElementById("trunk");
  }
  draw() {
    this.ctx.drawImage(this.trunkImg,this.x, this.y, this.width, this.height);
  }
  update() {
    if (this.x < this.cwidth && this.dir == 1) {
      this.x += this.step;
    } else if (this.x + this.width * 1.1 > 0 && this.dir == -1) {
      this.x -= this.step;
    } else {
      this.relocate();
    }
    this.draw();
  }
  relocate() {
    if (this.dir == 1) {
      this.x = -this.width
    } else {
      this.x = this.cwidth
    }
  }
}
