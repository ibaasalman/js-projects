import BaseLevel from "./../baseLevel.js";
export default class Start extends BaseLevel{
  constructor(canvas, context, nextLevelOrWindow) {
    super();
    this.canvas = canvas;
    this.ctx = context;
    this.width = canvas.width;
    this.height = canvas.height;
    this.nextLevelOrWindow = nextLevelOrWindow;
    this.bg1 = document.getElementById("introbg1-" + Lang);
    this.bg2 = document.getElementById("introbg2-" + Lang);
    this.count = 0;
    this.musicOn = false;
  }

  btnStartClick() {
    this.musicOn = false;
    A_main_Stop();
    this.nextLevelOrWindow();
  }
 
  draw() {
    this.count++;
    if (this.count < 10) {
      this.ctx.drawImage(this.bg1, 0, 0, this.width, this.height);
    } else {
      this.ctx.drawImage(this.bg2, 0, 0, this.width, this.height);
    }
    if (this.count > 20) this.count = 0;
  }
  render() {
    this.runMusic();
    this.draw();
  }

  runMusic(){
    if(this.musicOn == false){
      A_main();
      this.musicOn = true;
    }
  }
}
