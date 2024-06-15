const rootColors = document.querySelector(":root");
const settings = document.querySelector(".settings");
const overlay = document.getElementById("overlay");
const introOverlay = document.getElementById("introOverlay");
const followMeOverlay = document.getElementById("followMeOverlay");
const followMePopUp = document.querySelector(".followMe");
const AE_collect = document.getElementById("A_collect");
const AE_explosion = document.getElementById("A_explosion");
const AE_start = document.getElementById("A_start");
const AE_main = document.getElementById("A_main");
const AE_fail = document.getElementById("A_fail");
const AE_levelUp = document.getElementById("A_levelUp");
const sticker = document.getElementById("sticker");
const stickersOptions = document.querySelector(".stickers");

let introStatus = 0;
let Lang = "en";
let FullScreen = false;
let GameRun = false;

const stickers = ["mario.png","sponge.png","minions.png","mickey.png"]

stickers.forEach(s=>{
  const newSticker = document.createElement("img");
  newSticker.setAttribute("src","img/"+s);
  newSticker.addEventListener('click',changeSticker);
  stickersOptions.appendChild(newSticker);
})

function changeSticker(e){
  sticker.setAttribute("src",e.target.src);
  toggleCustomization();
}

function deleteSticker(e){
  sticker.setAttribute("src","");
  toggleCustomization()
}

followMeOverlay.addEventListener("click", HideFollowMe);

function HideFollowMe() {
  followMeOverlay.style.display = "none";
  followMePopUp.classList.remove("followMeActive")
}
function ShowFollowMe() {
  hideCustomization()
  followMeOverlay.style.display = "flex";
  followMePopUp.classList.add("followMeActive")
}

function ToggleFollowMe() {
  if (followMePopUp.classList.contains('followMeActive')) {
    HideFollowMe();    
  } else {
    ShowFollowMe();
  }
}

function selectLang(e) {
  Lang = e;
  introOverlay.style.display = "none";
  GameRun = true;
}

introOverlay.addEventListener("click", () => {
  enterFullscreen();
  if (introStatus == 0) {
    introStatus = 1;
    introOverlay.innerHTML = `<div>
  <p>If you are using a desktop, you can use the keyboard as a control device</p>
  <img src="img/controls.gif">
  <p>click to continue</p>
</div>`;
  } else {
    introOverlay.innerHTML = `<div>select your language</div>
  <div id="selectLang">
    
    <div onclick="selectLang('ar')">
      <img src="img/ar.png">
      العربية
    </div>
    <div onclick="selectLang('en')">
      <img src="img/en.png">
      english
    </div>
    <div onclick="selectLang('es')">
      <img src="img/es.png">
      espanol
    </div>
  </div>`;
  }
});

function enterFullscreen() {
  FullScreen = true;

  var element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
}
function ToggleFullScreen() {
  if (FullScreen) {
    document.exitFullscreen();
    FullScreen = false;
  } else {
    enterFullscreen();
  }
}

function customizeColor() {
  document.querySelectorAll(".colors > div").forEach((color) => {
    color.addEventListener("click", (e) => {
      document.querySelectorAll(".colors > div").forEach((color) => {
        color.classList.remove("active");
      });
      color.classList.add("active");
      rootColors.style.setProperty("--main", e.target.style.backgroundColor);
      rootColors.style.setProperty("--Dpad", e.target.getAttribute("Dpad"));
      toggleCustomization();
    });
  });
}
customizeColor();

function changeBrand() {
  let newBrand = document.getElementById("newBrand").value;
  newBrand = newBrand ? newBrand : "GameBoy";
  document.querySelector(".brand").textContent = newBrand;

  toggleCustomization();
}

function showCustomization() {
  overlay.style.display = "block";
  settings.style.top = "-5px";
  
}
function hideCustomization() {
  settings.style.top = "-500px";
  setTimeout(() => {
    overlay.style.display = "none";
  }, 1000);
}

overlay.addEventListener("click", () => {
  hideCustomization();
});
function toggleCustomization() {
  if (settings.style.top != "-5px") {
    HideFollowMe()
    showCustomization();
  } else {
    hideCustomization();
  }
}

function A_start(){
  playSound(AE_start);
}

function A_main(){
  AE_main.loop=true;
  playSound(AE_main);
}

function A_main_Stop(){
  AE_main.pause();
}

function A_levelUp(){
  playSound(AE_levelUp);
}

function A_fail(){
  playSound(AE_fail);
}

function A_explosion(){
  playSound(AE_explosion);
}

function A_collect(){
  playSound(AE_collect);
}


function playSound(sound) {
  sound.currentTime = 0; // Rewind to the start
  sound.play();
}
