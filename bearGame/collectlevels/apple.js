export default class Apple {
  constructor(ctx, cwidth, cheight) {
    this.ctx = ctx;
    this.width = 18;
    this.height = 18;
    this.cwidth = cwidth;
    this.cheight = cheight;
    this.randomPosition();
    this.gap = 2;
    this.appleImg = document.getElementById("apple");
  }
  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.drawImage(this.appleImg, this.x, this.y, this.width, this.height);
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
    this.y = -this.height;
    this.speed = Math.random() * 1.5 + 0.4;
    this.x = Math.random() * (this.cwidth - this.width);
  };
}
