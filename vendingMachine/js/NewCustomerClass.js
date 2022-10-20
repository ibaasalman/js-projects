import { Helper } from "./Helper.js";
import { MakingPayment } from "./MakingPaymentClass.js";
const MAKING_PAYMENT = new MakingPayment();
export class NewCustomer {
  constructor() {}

  keypadPressed(x) {
    if (x == "R") {
      Helper.keypadinput = "";
      Helper.screenOutPut(`Use Keypad To Select Any Item`);
    } else if (x == "inter") {
      if (Helper.keypadinput.length == 2) {
        let snack = Helper.snacks[Helper.keypadinput];
        Helper.screenOutPut(
          `${snack[0]} <span class="screenprice"> ${snack[1]}$</span> press > to confirm`
        );
        Helper.selectedItem = snack;
        Helper.keypadinput = "confirm";
      } else if (Helper.keypadinput == "confirm") {
        Helper.screenOutPut(
          `please insert <span class="screenprice"> ${Helper.selectedItem[1]}$</span> press R to cancel`
        );
        Helper.keypadinput = "";
        Helper.currentState = MAKING_PAYMENT;
      }
    } else if (Helper.keypadinput == "" && isNaN(x)) {
      Helper.keypadinput = x;
      Helper.screenOutPut(
        `<p>${Helper.keypadinput}</p> please inter row number`
      );
    } else if (Helper.keypadinput.length == 1 && !isNaN(x)) {
      Helper.keypadinput += x;
      Helper.screenOutPut(
        `<p>${Helper.keypadinput}</p> please press > to confirm`
      );
    } else if (Helper.keypadinput.length == 1 && isNaN(x)) {
      Helper.screenOutPut(
        `<p>${Helper.keypadinput}</p> please inter row number`
      );
    } else if (
      Helper.keypadinput.length >= 1 &&
      Helper.keypadinput != "confirm"
    ) {
      Helper.screenOutPut(
        `<p>${Helper.keypadinput}</p> please press > to confirm`
      );
    } else if (Helper.keypadinput != "confirm") {
      Helper.screenOutPut(
        "<span class='danger'>inter column letter at first</span>"
      );
    }
  }

  addmoney(val, cur) {
    Helper.keypadinput = "";
    Helper.screenOutPut(
      "<span class='danger'>select and confirm something to buy before inserting money</span>"
    );
    let cashback = "";
    if (val < 1) {
      cashback = `<div class="coin">${val * 100}${cur}</div>`;
    } else if (val <= 2) {
      cashback = `<div class="coin">${Math.trunc(val)}${cur}</div>`;
    } else {
      cashback = `<div class="note"><span>${Math.trunc(
        val
      )}${cur}</span></div>`;
    }
    Helper.createAlert(`The machine gave you back ${cashback}`, "collect");
  }
}
