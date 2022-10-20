export class Helper {
  static keypadinput = "";
  static currentState = null;
  static selectedItem = "";
  static total = 0;
  static coins = [];
  static accepted = [0.1, 0.2, 0.5, 1, 20, 50];
  static snacks = {
    A1: ["lays ketchup", "2.7", "imgs/1.png"],
    A2: ["snickers peanut", "3.5", "imgs/6.png"],
    A3: ["cocacola", "0.9", "imgs/11.png"],
    A4: ["snickers white", "3", "imgs/7.png"],
    A5: ["snickers protein", "1.6", "imgs/8.png"],
    B1: ["lays cheddar", "2.8", "imgs/2.png"],
    B2: ["snickers white", "3", "imgs/7.png"],
    B3: ["cheetos hot", "4.7", "imgs/12.png"],
    B4: ["oreo", "2.9", "imgs/10.png"],
    B5: ["lays cheddar", "2.8", "imgs/2.png"],
    C1: ["lays honey", "2.0", "imgs/3.png"],
    C2: ["snickers protein", "1.6", "imgs/8.png"],
    C3: ["cheetos large", "6.1", "imgs/13.png"],
    C4: ["lays honey", "2.0", "imgs/3.png"],
    C5: ["lays honey", "2.0", "imgs/3.png"],
    D1: ["lays salt", "1.8", "imgs/4.png"],
    D2: ["kitkat", "2", "imgs/9.png"],
    D3: ["lays ketchup", "2.7", "imgs/1.png"],
    D4: ["lays salt", "1.8", "imgs/4.png"],
    D5: ["cheetos large", "6.1", "imgs/13.png"],
    E1: ["lays classic", "1.1", "imgs/5.png"],
    E2: ["oreo", "2.9", "imgs/10.png"],
    E3: ["lays classic", "1.1", "imgs/5.png"],
    E4: ["lays classic", "1.1", "imgs/5.png"],
    E5: ["cocacola", "0.9", "imgs/11.png"],
  };

  static screen = document.querySelector(".screen");
  static createAlert = (cont, btn) => {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    const alert = document.createElement("div");
    alert.classList.add("alert");
    const alertbtn = document.createElement("button");
    const alertbtncont = document.createTextNode(btn);
    alertbtn.addEventListener("click", () => {
      alertbtn.parentElement.previousElementSibling.remove();
      alertbtn.parentElement.remove();
    });
    alertbtn.appendChild(alertbtncont);
    alert.innerHTML = cont;
    alert.appendChild(alertbtn);
    document.body.prepend(alert);
    document.body.prepend(overlay);
  };

  static screenOutPut = (cont) => {
    this.screen.innerHTML = cont;
  };
}
