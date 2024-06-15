import BaseLevel from "./../baseLevel.js";

export default class S1 extends BaseLevel{
  constructor(canvas, context, nextLevelOrWindow) {
    super();
    this.canvas = canvas;
    this.ctx = context;
    this.width = canvas.width;
    this.height = canvas.height;
    this.nextLevelOrWindow = nextLevelOrWindow;
    this.bg1 = document.getElementById("l1_1");
    this.bg2 = document.getElementById("l1_2");
    this.count = 0;
    this.opacity = 0;
    this.state = 0;

    this.text = {
      text1: {
        en: "Benny, the little bear, was out for a",
        ar: "كان الدب بيني في نزهة مع والديه في ",
        es: "Benny, el pequeno oso,estaba dando un",
      },
      text2: {
        en: "walk with his parents in the woods. ",
        ar: "الغابة، وفجأة وبينما كان منغمساً باللعب",
        es: "paseo con sus padres en el bosque.",
      },
      text3: {
        en: "while he was playing, he got lost.",
        ar: "ضاع الدب الصغير عنهما. ",
        es: "De repente mientras jugaba,se perdio",
      },
      text4: {
        en: "Benny felt sad and scared. He was now",
        ar: "شعر بيني بالحزن والخوف. لقد أصبح تائهاً",
        es: "Benny se sintio triste y asustado.",
      },
      text5: {
        en: "lost in the scary forest. Benny decided",
        ar: "وسط هذه الغابة الموحشة والمخيفة, لكن",
        es: "Benny decidio caminar por el bosque",
      },
      text6: {
        en: "to walk around the forest looking for",
        ar: "بيني قرر التجول في الغابة بحثاً عن أي",
        es: "buscando cualquier cosa que pudiera",
      },
      text7: {
        en: "anything could help find his way home.",
        ar: "شيء أو معلومة تساعده في العودة لمنزله",
        es: "ayudarlo a encontrar de regreso casa.",
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
