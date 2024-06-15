import BaseLevel from "./../baseLevel.js";

export default class S6 extends BaseLevel{
  constructor(canvas, context, nextLevelOrWindow) {
    super();
    this.canvas = canvas;
    this.ctx = context;
    this.width = canvas.width;
    this.height = canvas.height;
    this.nextLevelOrWindow = nextLevelOrWindow;
    this.bg1 = document.getElementById("l6_1");
    this.bg2 = document.getElementById("l6_2");
    this.count = 0;
    this.opacity = 0;
    this.state = 0;

    
    this.text = {
      text1: {
        en: "Benny : Finally, we have arrived home.",
        ar: "بيني  يقول : لقد وصلنا أخيرا إلى المنزل",
        es: "Benny: Finalmente, hemos llegado a casa",
      },
      text2: {
        en: "I have missed you both, Mom and Dad.",
        ar: "لقد اشتقت لكما يا أمي وأبي.",
        es: "Los extrañé a ambos, mamá y papá",
      },
      text3: {
        en: "I faced many obstacles on my journey",
        ar: "واجهت العديد من العقبات خلال الرحلة",
        es: "Enfrenté muchos obstáculos durante el viaje",
      },
      text4: {
        en: "but this kind person on the other side",
        ar: "لكن هذا الشخص اللطيف على الجانب",
        es: "pero esta persona amable al otro lado",
      },
      text5: {
        en: "helped me in the toughest situations",
        ar: "الآخر من الشاشة ساعدني في أصعب المواقف",
        es: "la pantalla me ayudó en las situaciones más difíciles",
      },
      text6: {
        en: "I want to express my gratitude to him",
        ar: "أرغب في تقديم شكري له",
        es: "Quiero expresarles mi gratitud.",
      },
      text7: {
        en: "nothing is beautiful than returning",
        ar: "لا شيء أجمل من العودة",
        es: "No hay nada más hermoso que regresar",
      },
      text8: {
        en: "to the warmth of home and family.",
        ar: "إلى دفء المنزل والعائلة",
        es: "al calor del hogar y la familia.",
      },
    };

  }

  btnBClick() {
    this.opacity = 0;
    this.state++;
    A_collect();
    if (this.state > 2) {
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
    }
    else if(this.state == 2){
      this.ctx.fillText(this.text.text6[Lang], xpoint, 160);
      this.ctx.fillText(this.text.text7[Lang], xpoint, 180);
      this.ctx.fillText(this.text.text8[Lang], xpoint, 200);
    }
  }
  render() {
    this.draw();
  }
}
