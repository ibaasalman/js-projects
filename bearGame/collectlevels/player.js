export default class Player {
  constructor(ctx, cwidth, cheight, life, score, goal, nextLevelOrWindow) {
    this.ctx = ctx;
    this.width = 30;
    this.height = 40;
    this.cwidth = cwidth;
    this.cheight = cheight;
    this.gap = 10;
    this.x = this.cwidth / 2 - this.width / 2;
    this.y = this.cheight - this.height - this.gap;
    this.step = 15;
    this.life = life;
    this.score = score;
    this.goal = goal;
    this.bearIMG = document.getElementById("bear-apple");
    this.heartIMG = document.getElementById("heart");
    this.heartWidth = 14;
    this.heartHeight = 13;
    this.nextLevelOrWindow = nextLevelOrWindow;
    this.scoreText = {
      en: "apples",
      ar: "apples",
      es: "manzanas",
    };
  }
  draw() {
    this.printScore();
    this.ctx.drawImage(this.bearIMG, this.x, this.y, this.width, this.height);
  }
  update(apples, boombs) {
    this.checkStatus();
    this.boomb(boombs);
    this.catch(apples);
    this.draw();
  }
  checkStatus() {
    if (this.score == this.goal) {
      //next level
      A_levelUp();
      this.nextLevelOrWindow();
    }

    if (this.life <= 0) {
      A_fail();
      this.score = 0;
      this.life = 5;
    }
  }
  moveRight() {
    if (this.x < this.cwidth - this.width) {
      this.x = this.x + 1 * this.step;
      if (this.x >= this.cwidth - this.width) {
        this.x = this.cwidth - this.width - this.gap;
      }
    }
  }
  moveLeft() {
    if (this.x > this.gap) {
      this.x = this.x - 1 * this.step;
      if (this.x < this.gap) {
        this.x = this.gap;
      }
    }
  }

  printScore() {
    this.ctx.textAlign = "left";
    if (this.life >= 0) {
      for (let i = 0; i < this.life; i++) {
        this.ctx.drawImage(
          this.heartIMG,
          i * (this.heartWidth + 2) + 5,
          5,
          this.heartWidth,
          this.heartHeight
        );
      }
      // Draw black outline
      this.ctx.fillStyle = "#000";
      this.ctx.fillText(
        this.scoreText[Lang] + ":" + this.score + "/" + this.goal,
        6,
        16 + 1 + this.heartHeight
      );

      // Draw actual text
      this.ctx.fillStyle = "#fff";
      this.ctx.fillText(
        this.scoreText[Lang] + ":" + this.score + "/" + this.goal,
        5,
        16 + this.heartHeight
      );
    }
  }
  catch(apples) {
    apples.forEach((apple) => {
      if (
        apple.y > this.y &&
        apple.x + apple.width > this.x &&
        apple.x < this.x + this.width
      ) {
        this.score++;
        A_collect();
        apple.relocate();
        this.printScore();
      } else if (apple.y >= this.cheight - apple.height - this.gap) {
        apple.relocate();
      }
    });
  }

  boomb(boombs) {
    boombs.forEach((bomb) => {
      if (
        bomb.y > this.y &&
        bomb.x + bomb.width > this.x &&
        bomb.x < this.x + this.width
      ) {
        if (this.score > 0) {
          this.score--;
        }
        if (this.life > 0) {
          this.life--;
        }
        A_explosion();
        bomb.relocate();
      } else if (bomb.y >= this.cheight - bomb.height - this.gap) {
        bomb.relocate();
      }
    });
  }
}
