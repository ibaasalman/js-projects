export default class mapPiece {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 26;
    this.gap = 2;
    this.mapPieceIMG = document.getElementById("mapPiece");
    this.hover = 0;
    this.touched = false;
  }
  draw() {
    this.hover++;
    if (this.hover > 8) {
      this.ctx.drawImage(
        this.mapPieceIMG,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
      this.ctx.drawImage(
        this.mapPieceIMG,
        this.x,
        this.y - 3,
        this.width,
        this.height
      );
    }
    if (this.hover == 16) {
      this.hover = 0;
    }
    // this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    if (!this.touched) this.draw();
  }
}
