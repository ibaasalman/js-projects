import BaseLevel from "./../baseLevel.js";

export default class S5 extends BaseLevel{
  constructor(canvas, context, nextLevelOrWindow) {
    super();
    this.canvas = canvas;
    this.ctx = context;
    this.width = canvas.width;
    this.height = canvas.height;
    this.nextLevelOrWindow = nextLevelOrWindow;
    this.bg1 = document.getElementById("l5_1");
    this.bg2 = document.getElementById("l5_2");
    this.count = 0;
    this.opacity = 0;
    this.state = 0;

    this.text = {
      text1: {
        en: "Help me cross the river by",
        ar: "ساعدني في عبور النهر عبر القفز",
        es: "Ayúdame a cruzar el río saltando",
      },
      text2: {
        en: "jumping over these moving planks",
        ar: "فوق هذه الأخشاب المتحركة.",
        es: "sobre estas tablas en movimiento",
      },
      text3: {
        en: "I can move right and left on",
        ar: "يمكنني التحرك يمينًا ويسارًا على",
        es: "Puedo moverme hacia la derecha",
      },
      text4: {
        en: "the planks, but remember",
        ar: "الأخشاب، لكن تذكر",
        es: "hacia la izquierda en las tablas",
      },
      text5: {
        en: "I can't swim.",
        ar: "أنني لا أجيد السباحة",
        es: "pero recuerda que no sé nadar",
      },
      text6: {
        en: "and if I fall into the river, I will drown",
        ar: "وإذا سقطت في النهر، فسأغرق",
        es: "y si caigo al río, me ahogaré.",
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
      this.ctx.fillText(this.text.text1[Lang], xpoint, 160);
      this.ctx.fillText(this.text.text2[Lang], xpoint, 180);
    } else if (this.state == 1) {
      this.ctx.fillText(this.text.text3[Lang], xpoint, 160);
      this.ctx.fillText(this.text.text4[Lang], xpoint, 180);
      this.ctx.fillText(this.text.text5[Lang], xpoint, 200);
    } else if (this.state == 2) {
      this.ctx.fillText(this.text.text6[Lang], xpoint, 180);
    }
  }
  render() {
    this.draw();
  }
}
