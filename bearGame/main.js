import level1 from "./platformlevels/level1.js";
import Intro from "./storySlides/intro.js";
import Start from "./storySlides/start.js";
import S1 from "./storySlides/s1.js";
import S2 from "./storySlides/s2.js";
import S3 from "./storySlides/s3.js";
import level2 from "./collectlevels/level2.js";
import S4 from "./storySlides/s4.js";
import S5 from "./storySlides/s5.js";
import level3 from "./crossinglevels/level3.js";
import S6 from "./storySlides/s6.js";

let currenlevel = null;

// Desired frame rate (frames per second)
const desiredFPS = 30;

// Calculate the frame duration in milliseconds
const frameDuration = 1000 / desiredFPS;

// Define variables for the animation loop
let lastFrameTime = 0;

const initializeGame = () => {
  const levelAndWindows = [];
  const c = document.getElementById("game");
  c.height = 225;
  c.width = 250;
  const ctx = c.getContext("2d");
  ctx.font = "10px Public Pixel";
  let currentLevelOrWindowIndex = 0;
  const nextLevelOrWindow = () => {
    if (currentLevelOrWindowIndex == levelAndWindows.length - 1 ) {
      currentLevelOrWindowIndex = 1;
    }else if (currentLevelOrWindowIndex < levelAndWindows.length) {
      currentLevelOrWindowIndex++;
    } 
  };

  levelAndWindows.push(new Intro(c, ctx, nextLevelOrWindow)); // 0
  levelAndWindows.push(new Start(c, ctx, nextLevelOrWindow)); // 1
  levelAndWindows.push(new S1(c, ctx, nextLevelOrWindow)); // 2
  levelAndWindows.push(new S2(c, ctx, nextLevelOrWindow)); // 3
  levelAndWindows.push(new level1(c, ctx, nextLevelOrWindow)); // 4
  levelAndWindows.push(new S3(c, ctx, nextLevelOrWindow)); // 5
  levelAndWindows.push(new level2(c, ctx, nextLevelOrWindow)); // 6
  levelAndWindows.push(new S4(c, ctx, nextLevelOrWindow)); // 7
  levelAndWindows.push(new S5(c, ctx, nextLevelOrWindow)); // 8
  levelAndWindows.push(new level3(c, ctx, nextLevelOrWindow)); // 9
  levelAndWindows.push(new S6(c, ctx, nextLevelOrWindow)); // 10

  // Handle start button
  document.querySelector(".start").addEventListener("click", () => {
    levelAndWindows[currentLevelOrWindowIndex].btnStartClick();
  });

  // Handle keyboard inputs
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      levelAndWindows[currentLevelOrWindowIndex].movement.right = true;
      levelAndWindows[currentLevelOrWindowIndex].btnRightClick();
    }
    if (event.key === "ArrowLeft") {
      levelAndWindows[currentLevelOrWindowIndex].movement.left = true;
      levelAndWindows[currentLevelOrWindowIndex].btnLeftClick();
    }
    if (event.key.toLowerCase() === "b") {
      levelAndWindows[currentLevelOrWindowIndex].movement.jump = true;
      levelAndWindows[currentLevelOrWindowIndex].btnBClick();
    }
  });

  window.addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight") {
      levelAndWindows[currentLevelOrWindowIndex].movement.right = false;
    }
    if (event.key === "ArrowLeft") {
      levelAndWindows[currentLevelOrWindowIndex].movement.left = false;
    }
    if (event.key.toLowerCase() === "b") {
      levelAndWindows[currentLevelOrWindowIndex].movement.jump = false;
    }
  });

  // Handle Mouse inputs
  document.querySelector(".right").addEventListener("mousedown", () => {
    levelAndWindows[currentLevelOrWindowIndex].movement.right = true;
    levelAndWindows[currentLevelOrWindowIndex].btnRightClick();
  });
  document.querySelector(".right").addEventListener("mouseup", () => {
    levelAndWindows[currentLevelOrWindowIndex].movement.right = false;
  });
  document.querySelector(".left").addEventListener("mousedown", () => {
    levelAndWindows[currentLevelOrWindowIndex].movement.left = true;
    levelAndWindows[currentLevelOrWindowIndex].btnLeftClick();
  });
  document.querySelector(".left").addEventListener("mouseup", () => {
    levelAndWindows[currentLevelOrWindowIndex].movement.left = false;
  });
  document.querySelector(".b").addEventListener("mousedown", () => {
    levelAndWindows[currentLevelOrWindowIndex].movement.jump = true;
    levelAndWindows[currentLevelOrWindowIndex].btnBClick();
  });
  document.querySelector(".b").addEventListener("mouseup", () => {
    levelAndWindows[currentLevelOrWindowIndex].movement.jump = false;
  });

  // Handle Touch inputs
  document.querySelector(".right").addEventListener("touchstart", () => {
    levelAndWindows[currentLevelOrWindowIndex].movement.right = true;
    levelAndWindows[currentLevelOrWindowIndex].btnRightClick();
  });
  document.querySelector(".right").addEventListener("touchend", () => {
    levelAndWindows[currentLevelOrWindowIndex].movement.right = false;
  });
  document.querySelector(".left").addEventListener("touchstart", () => {
    levelAndWindows[currentLevelOrWindowIndex].movement.left = true;
    levelAndWindows[currentLevelOrWindowIndex].btnLeftClick();
  });
  document.querySelector(".left").addEventListener("touchend", () => {
    levelAndWindows[currentLevelOrWindowIndex].movement.left = false;
  });
  document.querySelector(".b").addEventListener("touchstart", () => {
    levelAndWindows[currentLevelOrWindowIndex].movement.jump = true;
    levelAndWindows[currentLevelOrWindowIndex].btnBClick();
  });
  document.querySelector(".b").addEventListener("touchend", () => {
    levelAndWindows[currentLevelOrWindowIndex].movement.jump = false;
  });

  // Main animation loop
  function animate(currentTime) {
    // Calculate the time elapsed since the last frame
    const elapsedTime = currentTime - lastFrameTime;

    // Check if enough time has passed to maintain the desired frame rate
    if (elapsedTime >= frameDuration) {
      lastFrameTime = currentTime;

      // Clear the canvas
      ctx.clearRect(0, 0, c.width, c.height);

      // Render the current level
      levelAndWindows[currentLevelOrWindowIndex].render();
    }

    // Request the next animation frame
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
};

addEventListener("load", () => {
  if (GameRun) {
    initializeGame();
  } else {
    const checkGameRunInterval = setInterval(() => {
      if (GameRun) {
        clearInterval(checkGameRunInterval);
        initializeGame();
      }
    }, 100); // Check every 100ms if GameRun is true
  }
});
