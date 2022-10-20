import { NewCustomer } from "./NewCustomerClass.js";
import { Helper } from "./Helper.js";

const WAITING_NEW_CUSTOMER = new NewCustomer();

Helper.currentState = WAITING_NEW_CUSTOMER;

const snacksslot = document.querySelector(".snackslot");
draw();

const keypad = document.querySelectorAll(".keypad button");
keypad.forEach((btn) => {
  btn.onclick = (e) => {
    Helper.currentState.keypadPressed(e.target.getAttribute("val"));
  };
});

const moneybtns = document.querySelectorAll(".coins .money");
moneybtns.forEach((btn) => {
  btn.onclick = (e) => {
    Helper.currentState.addmoney(e.target.getAttribute("val"),e.target.getAttribute("cur"));
  };
});

function draw(){

    for (const property in Helper.snacks) {
        const i = Helper.snacks[property];
        const mydiv = document.createElement("div");
        mydiv.classList.add("snack");
        const myimg = document.createElement("img");
        myimg.setAttribute("src",i[2]);
        mydiv.appendChild(myimg);
        snacksslot.appendChild(mydiv);
    }

}
