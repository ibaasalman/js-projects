import BaseLevel from "./../baseLevel.js";

export default class S3 extends BaseLevel{
  constructor(canvas, context, nextLevelOrWindow) {
    super();
    this.canvas = canvas;
    this.ctx = context;
    this.width = canvas.width;
    this.height = canvas.height;
    this.nextLevelOrWindow = nextLevelOrWindow;
    this.bg1 = document.getElementById("l3_1");
    this.bg2 = document.getElementById("l3_2");
    this.count = 0;
    this.opacity = 0;
    this.state = 0;

    this.text = {
      text1: {
        en: "Well done! You helped the bear Benny",
        ar: "أحسنت لقد ساعدت بيني في جمع",
        es: "¡Bien hecho! Ayudaste al oso Benny",
      },
      text2: {
        en: "in assembling the map pieces.",
        ar: " قطع الخريطة وهي مكتملة الان",
        es: "a ensamblar las piezas del mapa",
      },
      text3: {
        en: "it is complete now.",
        ar: "يبدو أن علينا المرور من غابة أشجار",
        es: "y ahora esta completo.",
      },
      text4: {
        en: "That sounds great!",
        ar: "التفاح، ثم علينا عبور النهر",
        es: "Parece que necesitamos pasar",
      },
      text5: {
        en: "we need to pass through the apple",
        ar: "يبدو رائعًا!",
        es: "por el bosque de arboles de manzana",
      },
      text6: {
        en: "forest then we need to cross the river",
        ar: "",
        es: "luego necesitamos cruzar el rio.",
      },
      text7: {
        en: "I'm feeling hungry.",
        ar: "أشعر بالجوع.",
        es: "Tengo hambre. Ayudame a",
      },
      text8: {
        en: "Help me gather some apples.",
        ar: "ساعدني لنجمع بعض التفاح.",
        es: "recolectar algunas manzanas.",
      },
    };

  }

  btnBClick() {
    this.opacity = 0;
    this.state++;
    A_collect();
    if (this.state >= 4) {
      A_start();
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
      this.ctx.fillText(this.text.text1[Lang], xpoint, 180);
      this.ctx.fillText(this.text.text2[Lang], xpoint, 200);
    } else if (this.state == 1) {
      this.ctx.fillText(this.text.text3[Lang], xpoint, 180);
      this.ctx.fillText(this.text.text4[Lang], xpoint, 200);
    }
    else if (this.state == 2) {
      this.ctx.fillText(this.text.text5[Lang], xpoint, 180);
      this.ctx.fillText(this.text.text6[Lang], xpoint, 200);
    }
    else if (this.state == 3) {
      this.ctx.fillText(this.text.text7[Lang], xpoint, 180);
      this.ctx.fillText(this.text.text8[Lang], xpoint, 200);
    }
    else if (this.state == 4) {
      this.ctx.fillText(this.text.text9[Lang], xpoint, 180);
      this.ctx.fillText(this.text.text10[Lang], xpoint, 200);
    }
  }
  render() {
    this.draw();
  }
}
