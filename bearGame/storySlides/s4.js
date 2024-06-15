import BaseLevel from "./../baseLevel.js";

export default class S4 extends BaseLevel{
  constructor(canvas, context, nextLevelOrWindow) {
    super();
    this.canvas = canvas;
    this.ctx = context;
    this.width = canvas.width;
    this.height = canvas.height;
    this.nextLevelOrWindow = nextLevelOrWindow;
    this.bg1 = document.getElementById("l4_1");
    this.bg2 = document.getElementById("l4_2");
    this.count = 0;
    this.opacity = 0;
    this.state = 0;

    this.text = {
      text1: {
        en: "mmm I feel full now",
        ar: "ممم أنا اشعر بالشبع الان",
        es: "mmm Me siento lleno ahora",
      },
      text2: {
        en: "thank you",
        ar: "شكرا لك",
        es: "gracias",
      },
      text3: {
        en: "We should continue our journey now.",
        ar: "يجب ان نكمل رحلتنا الان",
        es: "Deberíamos continuar nuestro viaje",
      },
      text4: {
        en: "We still need to cross the river to",
        ar: "يتبقى ان نعبر النهر حتى نصل الى المنزل",
        es: "Todavía necesitamos cruzar el río",
      },
      text5: {
        en: "reach home. Please help me.",
        ar: "ساعدني من فضلك",
        es: "para llegar a casa Por favor, ayúdame",
      },
      text6: {
        en: "",
        ar: "",
        es: "",
      },
      text7: {
        en: "",
        ar: "",
        es: "",
      },
    };
  }

  btnBClick() {
    this.opacity = 0;
    this.state++;
    A_collect();
    if (this.state >= 2) {
      this.nextLevelOrWindow();
    }
  }

  draw() {
    this.count++;
    if (this.count < 10) {
      this.ctx.drawImage(this.bg1, 0, 0, this.width, this.height);
    } else {
      this.ctx.drawImage(this.bg2, 0, 0, this.width, this.height);
    }
    if (this.count > 20) this.count = 0;

    if (this.opacity < 1) {
      this.opacity += 0.04;
    }
    let xpoint = this.width / 2;
    // Set font properties
    this.ctx.fillStyle = "rgba(255, 255, 255, " + this.opacity + ")"; // Set text color to white
    this.ctx.textAlign = "center";
    this.ctx.font = "12px ARCADECLASSIC";
    if (this.state == 0) {
      this.ctx.fillText(this.text.text1[Lang], xpoint, 160);
      this.ctx.fillText(this.text.text2[Lang], xpoint, 180);
    } else if (this.state == 1) {
      this.ctx.fillText(this.text.text3[Lang], xpoint, 160);
      this.ctx.fillText(this.text.text4[Lang], xpoint, 180);
      this.ctx.fillText(this.text.text5[Lang], xpoint, 200);
      this.ctx.fillText(this.text.text7[Lang], xpoint, 200);
    }
  }
  render() {
    this.draw();
  }
}
