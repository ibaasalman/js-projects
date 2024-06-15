export default class Player {
  constructor(ctx, cwidth, cheight, life, score, trunks ,nextLevelOrWindow) {
    this.ctx = ctx;
    this.width = 20 ;
    this.height = 30 ;
    this.cwidth = cwidth;
    this.cheight = cheight;
    this.gap = 10;
    this.x = this.cwidth / 2 - this.width / 2;
    this.y = this.cheight - this.height - this.gap;
    this.step = 15;
    this.life = life;
    this.trunks = trunks;
    this.currentTrunkOrder = this.trunks.length / 2 + 1;
    this.currentTrunk = null;
    this.xOnTrunk;
    this.heartIMG = document.getElementById("heart");
    this.riverBear = document.getElementById("riverBear");
    this.heartWidth = 14;
    this.heartHeight = 13;
    this.nextLevelOrWindow = nextLevelOrWindow;
  }
  draw() {
    if(this.life <= 0){
      this.life = 5;
      A_fail()
    }
    if (this.currentTrunk == null) {
      this.ctx.drawImage(this.riverBear,this.x, this.y, this.width, this.height);
    } else {
      this.x = this.currentTrunk.x + this.xOnTrunk;
      this.ctx.drawImage(this.riverBear,this.x, this.y, this.width, this.height);
    }
    this.printScore();
  }
  update() {
    this.draw();
    this.cheackHit();
  }

  printScore() {
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
      
    }
  }

  jump() {
    if(this.currentTrunkOrder < 2){
      A_levelUp();
      this.nextLevelOrWindow();
    }
    let jumped = false;
    this.trunks.forEach((trunk) => {
      if (
        this.x >= trunk.x &&
        this.x + this.width < trunk.x + trunk.width &&
        trunk.order == this.currentTrunkOrder - 1
      ) {
        this.y = trunk.y - this.height + trunk.height / 2;
        this.currentTrunkOrder = trunk.order;
        this.currentTrunk = trunk;
        this.xOnTrunk = this.x - this.currentTrunk.x;
        jumped = true;
        A_collect();
      }
    });
    if (!jumped) {
      this.die();
    }
  }

  cheackHit() {
    if (this.x + this.width >= this.cwidth) {
      this.die();
    }
  }

  die() {
    this.life--;
    A_explosion();
    this.resetLocation();
  }
  resetLocation() {
    this.x = this.cwidth / 2 - this.width / 2;
    this.y = this.cheight - this.height - this.gap;
    this.currentTrunkOrder = this.trunks.length / 2 + 1;
    this.currentTrunk = null;
  }

  right() {
    if (
      this.currentTrunk != null &&
      this.x + this.width < this.currentTrunk.x + this.currentTrunk.width - 5
    ) {
      this.xOnTrunk += 4;
    } else if (
      this.currentTrunk == null &&
      this.x + this.width < this.cwidth - 1
    ) {
      this.x += 4;
    }
  }
  left() {
    if (this.currentTrunk != null && this.x > this.currentTrunk.x + 5) {
      this.xOnTrunk -= 4;
    } else if (this.currentTrunk == null && this.x > 1) {
      this.x -= 4;
    }
  }
}
