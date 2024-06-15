import BaseLevel from "./../baseLevel.js";
export default class Intro extends BaseLevel{
  constructor(canvas, context, nextLevelOrWindow) {
    super();
    this.canvas = canvas;
    this.ctx = context;
    this.width = canvas.width;
    this.height = canvas.height;
    this.nextLevelOrWindow = nextLevelOrWindow;
    this.state = 0;
    this.state1Interval;
    this.state2Interval;
    this.opacity = 0;
    this.text = {
      text1: {
        en: "Important Notice:",
        ar: "إشعار مهم:",
        es: "Aviso importante:",
      },
      text2: {
        en: "I would like to bring to",
        ar: "أود أن ألفت انتباهكم إلى أن جميع",
        es: "Me gustaría señalar que",
      },
      text3: {
        en: "your attention that all",
        ar: "(Pixel Art) تصميمات فن البكسل",
        es: "su atención que todos los",
      },
      text4: {
        en: "the pixel art, concept ,",
        ar: "والقصة وتصميم هذا الجهاز الافتراضي",
        es: "el arte de píxeles, concepto,",
      },
      text5: {
        en: "and programming for this",
        ar: "وبرمجة هذه اللعبة قد تم تطويرها",
        es: "y la programación de este",
      },
      text6: {
        en: "game have exclusively",
        ar: "بشكل حصري بواسطة",
        es: "juego han sido exclusivamente",
      },
      text7: {
        en: "developed by Ibaa Salman",
        ar: " إباء سلمان",
        es: "desarrollado por Ibaa salman",
      },
      text8: {
        en: "for educational purposes",
        ar: "لأغراض تعليمية",
        es: "con fines educativos",
      },
    };
  }

  btnStartClick() {this.nextLevelOrWindow();}
  
  draw() {
    if (this.state == 0) {
      this.ctx.fillStyle = "black"; // Set the background color
      this.ctx.fillRect(0, 0, this.width, this.height); // Fill the canvas with black

      // Set font properties
      this.ctx.fillStyle = "white"; // Set text color to white
      this.ctx.textAlign = "center";

      // Calculate the center coordinates of the canvas
      var centerX = this.width / 2;
      var centerY = this.height / 2;

      this.opacity += 0.018; // Increase opacity gradually

      // Set text color with current opacity
      this.ctx.fillStyle = "rgba(255, 255, 255, " + this.opacity + ")";
      // Draw the text in the center of the canvas
      this.ctx.fillText("Project By", centerX, centerY - 10);
      this.ctx.font = "15px Public Pixel";
      this.ctx.fillText("✨Ibaa Salman✨", centerX, centerY + 10);
      this.ctx.font = "10px Public Pixel";

      if (this.state1Interval == null) {
        this.state1Interval = setTimeout(() => {
          this.state = 1;
          this.opacity = 0;
        }, 5000);
      }
    } else if (this.state == 1) {
      this.ctx.fillStyle = "black"; // Set the background color
      this.ctx.fillRect(0, 0, this.width, this.height); // Fill the canvas with black

      if (this.opacity < 1) {
        this.opacity += 0.04;
      }

      // Set text color with current opacity
      this.ctx.fillStyle = "rgba(255, 255, 255, " + this.opacity + ")";
      this.ctx.textAlign = "left";
      this.ctx.font = "30px ARCADECLASSIC";
      this.ctx.fillText("⚠️", 7, 30);
      this.ctx.font = "14px ARCADECLASSIC";
      this.ctx.fillText(this.text.text1[Lang], 43, 30);

      this.ctx.textAlign = "center";
      let xpoint = this.width / 2;

      this.ctx.font = "13px ARCADECLASSIC";
      this.ctx.fillText(this.text.text2[Lang], xpoint, 65);
      this.ctx.fillText(this.text.text3[Lang], xpoint, 85);
      this.ctx.fillText(this.text.text4[Lang], xpoint, 105);
      this.ctx.fillText(this.text.text5[Lang], xpoint, 125);
      this.ctx.fillText(this.text.text6[Lang], xpoint, 145);
      this.ctx.fillText(this.text.text7[Lang], xpoint, 165);
      this.ctx.fillText(this.text.text8[Lang], xpoint, 185);

      if (this.state2Interval == null) {
        this.state2Interval = setTimeout(() => {
          this.nextLevelOrWindow();
        }, 15000);
      }
    }
  }
  render() {
    this.draw();
  }
}
