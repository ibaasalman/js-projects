import BaseLevel from "./../baseLevel.js";

export default class S2 extends BaseLevel{
  constructor(canvas, context, nextLevelOrWindow) {
    super();
    this.canvas = canvas;
    this.ctx = context;
    this.width = canvas.width;
    this.height = canvas.height;
    this.nextLevelOrWindow = nextLevelOrWindow;
    this.bg1 = document.getElementById("l2_1");
    this.bg2 = document.getElementById("l2_2");
    this.count = 0;
    this.opacity = 0;
    this.state = 0;

    this.text = {
      text1: {
        en: "Help the little bear Benny",
        ar: "ساعد الدب الصغير بيني",
        es: "Ayuda al pequeño oso Benny",
      },
      text2: {
        en: "to collect the pieces of the map,",
        ar: "في جمع أجزاء الخريطة",
        es: "a recoger las piezas del mapa.",
      },
      text3: {
        en: "",
        ar: "",
        es: "",
      },
      text4: {
        en: "but be careful and avoid",
        ar: "لكن انتبه وتجنب",
        es: "pero ten cuidado y evita",
      },
      text5: {
        en: "the traps and bees",
        ar: "الأفخاخ والنحل",
        es: "las trampas y las abejas porque",
      },
      text6: {
        en: "because they will hurt Benny.",
        ar: "لأنها ستؤذي بيني.",
        es: "lastimarán a Benny.",
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
      this.ctx.fillText(this.text.text1[Lang], xpoint, 140);
      this.ctx.fillText(this.text.text2[Lang], xpoint, 160);
      this.ctx.fillText(this.text.text3[Lang], xpoint, 180);
    } else if (this.state == 1) {
      this.ctx.fillText(this.text.text4[Lang], xpoint, 140);
      this.ctx.fillText(this.text.text5[Lang], xpoint, 160);
      this.ctx.fillText(this.text.text6[Lang], xpoint, 180);
      this.ctx.fillText(this.text.text7[Lang], xpoint, 200);
    }
  }
  render() {
    this.draw();
  }
}
