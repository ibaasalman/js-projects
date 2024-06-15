export default class Player {
  constructor(ctx, cwidth, cheight, life, score, platforms, bees, maps , screws) {
    this.ctx = ctx;
    this.width = 28;
    this.height = 40;
    this.cwidth = cwidth;
    this.cheight = cheight;
    this.gap = 20;
    this.x = 40;
    this.y = 10;
    this.step = 2;
    this.score = score;
    this.bearIMG = document.getElementById("bear");
    this.heartIMG = document.getElementById("heart");
    this.heartWidth = 14;
    this.heartHeight = 13;
    this.jumpPower = 70;
    this.platforms = platforms;
    this.bees = bees;
    this.location = 0;
    this.onAir = false;
    this.BearframesCount = Math.round(this.bearIMG.width / this.width);
    this.BearCurrentFrame = 0;
    this.BearDir = true;
    this.gravityPower = 7;
    this.maps = maps;
    this.screws = screws;
    this.hover = 0;
  }
  draw() {
    this.hover++;
    this.ctx.beginPath();
    const triangleX = this.x + this.width / 2;
    let triangleY;
    if (this.hover > 8) {
      this.ctx.fillStyle = "#f70101"; // Set fill color to blue
      triangleY = this.y - 7;
    } else {
      this.ctx.fillStyle = "#d40101"; // Set fill color to blue
      triangleY = this.y - 5;
    }
    this.ctx.moveTo(triangleX, triangleY); // Move to point above the bear's head

    // Draw lines to form a triangle
    this.ctx.lineTo(triangleX - 7, triangleY - 12); // Line to the top left corner
    this.ctx.lineTo(triangleX + 7, triangleY - 12); // Line to the top right corner

    // Close the path to complete the triangle
    this.ctx.closePath();

    // Fill the triangle with a blue color

    this.ctx.fill();

    if (this.hover == 16) {
      this.hover = 0;
    }

    this.ctx.save();
    if (this.BearDir) {
      this.ctx.drawImage(
        this.bearIMG,
        this.width * this.BearCurrentFrame,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.bearIMG,
        this.width * this.BearCurrentFrame,
        0,
        this.width,
        this.height,
        -this.x - this.width,
        this.y,
        this.width,
        this.height
      );
    }

    this.ctx.restore();
  }
  update(
    life,
    setLife,
    orignalPlatformLocation,
    orignalBeesLocation,
    orignalMapsLocation,
    orignalScrewLocation,
    mapsCollected,
    setMapsCollected
  ) {
    this.gravity();
    this.gravity();
    this.gravity();
    this.gravity();
    this.gravity();
    this.draw();
    this.printScore(life, mapsCollected);
    let beeCollision = this.detectBeeCollisions(this.bees);
    let mapCollision = this.detectMapCollisions(this.maps);
    let screwsCollison = this.detectScrewsCollisions(this.screws);

    if(screwsCollison !=0){
      console.log("gfdgdgdg")
      this.x = 0;
      this.location = 0;
      this.platforms.forEach((i, index) => {
        i.x = orignalPlatformLocation[index].x;
      });
      this.bees.forEach((i, index) => {
        i.x = orignalBeesLocation[index].x;
        i.position = i.x;
      });
      this.maps.forEach((i, index) => {
        i.x = orignalMapsLocation[index].x;
        i.position = i.x;
      });
      this.screws.forEach((i, index) => {
        i.x = orignalScrewLocation[index].x;
        i.position = i.x;
      });
      setLife(life - 1); 
    }
    if (beeCollision != 0) {
      this.x = 0;
      this.location = 0;
      this.platforms.forEach((i, index) => {
        i.x = orignalPlatformLocation[index].x;
      });
      this.bees.forEach((i, index) => {
        i.x = orignalBeesLocation[index].x;
        i.position = i.x;
      });
      this.maps.forEach((i, index) => {
        i.x = orignalMapsLocation[index].x;
        i.position = i.x;
      });
      setLife(life - 1);
    }
    
    if (mapCollision != 0) {
      mapCollision = 0;
      setMapsCollected()
    }
    //console.log(this.location)
  }
  jump() {
    if (!this.onAir) {
      let jumpCollison = false;
      for (let i = 0; i < this.platforms.length; i++) {
        if (this.platforms[i].width < 500) {
          if (
            this.x >= this.platforms[i].x - this.width / 2 &&
            this.x <= this.platforms[i].x + this.platforms[i].width &&
            this.y >= this.platforms[i].y + this.platforms[i].height
          ) {
            jumpCollison = true;
          }
        }
      }
      if (!jumpCollison) {
        for (let i = 0; i < this.jumpPower; ) {
          i++;
          setTimeout(() => {
            this.y -= 1;
          }, i * 11);
        }
        this.onAir = true;
      }
    }
  }
  moveRight() {
    if (this.x < this.cwidth / 2 - this.width) {
      this.x = this.x + this.step;
      this.location += this.step;
    } else {
      this.platforms.forEach((platform) => {
        platform.x -= this.step;
        this.location += this.step;
      });

      this.bees.forEach((bee) => {
        bee.x -= this.step;
      });

      this.maps.forEach((map) => {
        map.x -= this.step;
      });

      this.screws.forEach(screw => {
        screw.x -= this.step;
      });
    }

    this.BearCurrentFrame += 1;
    if (this.BearCurrentFrame >= this.BearframesCount) {
      this.BearCurrentFrame = 0;
    }
    this.BearDir = true;
  }
  moveLeft() {
    if (this.location >= this.step) {
      if (this.x > this.gap) {
        this.x -= this.step;
        this.location -= this.step;
      } else {
        this.platforms.forEach((platform) => {
          platform.x += this.step;
          this.location -= this.step;
        });
        this.bees.forEach((bee) => {
          bee.x += this.step;
        });
        this.maps.forEach((map) => {
          map.x += this.step;
        });
        this.screws.forEach(screw => {
          screw.x += this.step;
        });
      }
      this.BearCurrentFrame -= 1;
      if (this.BearCurrentFrame < 0) {
        this.BearCurrentFrame = this.BearframesCount - 1;
      }
      this.BearDir = false;
    }
  }

  gravity() {
    let stand = false;
    for (let i = 0; i < this.platforms.length; i++) {
      if (
        this.x >= this.platforms[i].x - this.width / 2 &&
        this.x <=
          this.platforms[i].x + this.platforms[i].width - this.width / 2 &&
        this.y + this.height >= this.platforms[i].y &&
        this.y + this.height < this.platforms[i].y + this.gravityPower
      ) {
        stand = true;
        this.onAir = false;
      }
    }
    if (!stand) {
      this.y += 1;
    }
  }

  detectCollisions(objects) {
    /* res [
       -1 = collision on left side ,
        0 = no collesions ,
        1 = collision on right side ,
    ]    
     */
    let res = 0;
    let p = null;
    for (let i = 0; i < objects.length; i++) {
      p = objects[i];
      if (p.width < 500) {
        if (
          this.x + this.step / 2 + this.width >= p.x &&
          this.x - this.step / 2 <= p.x + p.width &&
          p.y >= this.y &&
          p.y + p.height <= this.y + this.height
        ) {
          if (this.x + this.width >= p.x + p.width) {
            res = -1;
            break;
          }
          res = 1;
          break;
        }

        //corners collisons
        if (
          this.x + this.width >= p.x &&
          this.x + this.width < p.x + p.width &&
          this.y + this.height > p.y &&
          this.y <= p.y
        ) {
          res = 1;
        }

        if (
          this.x <= p.x + p.width &&
          this.x >= p.x &&
          this.y + this.height > p.y &&
          this.y <= p.y
        ) {
          res = -1;
        }
      }
    }
    //in case its the starting point
    if (this.location <= 0) {
      res = -1;
    }
    return res;
  }

  detectBeeCollisions(objects) {
    /* res [ 0 = no collesions ,1 = collision, ]
     */
    let res = 0;
    let p = null;
    for (let i = 0; i < objects.length; i++) {
      p = objects[i];
      if (
        this.x + this.width >= p.position &&
        this.x <= p.position + p.width &&
        p.y >= this.y &&
        p.y < this.y + this.height
      ) {
        A_explosion();
        res = 1;
        break;
      }
    }
    return res;
  }

  detectMapCollisions(objects) {
    /* res [ 0 = no collesions ,1 = collision, ]
     */
    let res = 0;
    let p = null;
    for (let i = 0; i < objects.length; i++) {
      p = objects[i];
      if (p.touched) continue;
      if (
        this.x + this.width >= p.x &&
        this.x <= p.x + p.width &&
        p.y >= this.y &&
        p.y < this.y + this.height
      ) {
        p.touched = true;
        res = 1;
        A_collect();
        break;
      }
    }
    return res;
  }

  detectScrewsCollisions(objects) {
     /* res [ 0 = no collesions ,1 = collision, ]
     */
     let res = 0;
     let p = null;
     for (let i = 0; i < objects.length; i++) {
       p = objects[i];
       if (
         this.x + this.width >= p.x &&
         this.x <= p.x + p.width &&
         p.y >= this.y &&
         p.y < this.y + this.height
       ) {
         A_explosion();
         res = 1;
         break;
       }
     }
     return res;
  }

  printScore(life, maps) {
    // Draw the hearts
    if (life >= 0) {
      for (let i = 0; i < life; i++) {
        this.ctx.drawImage(
          this.heartIMG,
          i * (this.heartWidth + 2) + 5,
          5,
          this.heartWidth,
          this.heartHeight
        );
      }
      // Draw black outline
      this.ctx.textAlign = "left"; 
      this.ctx.fillStyle = "#000";
      this.ctx.fillText(`Maps: ${maps}/6`, 5 + 1, 16 + 1 + this.heartHeight);

      // Draw actual text
      this.ctx.fillStyle = "#fff";
      this.ctx.fillText(`Maps: ${maps}/6`, 5, 16 + this.heartHeight);
    }
  }
}
