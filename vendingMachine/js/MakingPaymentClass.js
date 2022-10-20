import { NewCustomer } from "./NewCustomerClass.js";
import { Helper } from "./Helper.js";

export class MakingPayment {
  constructor() {}
  keypadPressed(btn) {
    if (btn == "R") {
        if (Helper.cus_money == 0) {
            Helper.selectedItem = "";
            const WAITING_NEW_CUSTOMER = new NewCustomer();
            Helper.screenOutPut(`Use Keypad To Select Any Item`);
            Helper.currentState = WAITING_NEW_CUSTOMER;
        } 
        else {
            let cashbackcoins = "";
            Helper.coins.forEach((i) => {
            cashbackcoins += this.identifyCoin(i[0], i[1]);
        });
        Helper.createAlert(
          `The machine gave you back <div class="flex"> ${cashbackcoins}</div>`,
          "collect"
        );
        Helper.selectedItem = "";
        Helper.coins = [];
        Helper.total = 0;
        const WAITING_NEW_CUSTOMER = new NewCustomer();
        Helper.screenOutPut(`Use Keypad To Select Any Item`);
        Helper.currentState = WAITING_NEW_CUSTOMER;
      }
    }
  }

  addmoney(val, cur) {
    if (Helper.accepted.indexOf(+val) >= 0 && (cur == "$" || cur == "c")) {
      Helper.coins.push([val, cur]);
      Helper.total += +val;
      Helper.screenOutPut(
        `your total : <span class="screenprice"> ${Helper.total.toFixed(
          2
        )}$</span> /  ${Helper.selectedItem[1]}`
      );
      if (Helper.total >= Helper.selectedItem[1]) {
        let rest = Helper.total - Helper.selectedItem[1];
        rest = rest.toFixed(2)
        let restcopy = rest;
        let cashback = "";
        if (rest > 0) {
          let i = Helper.accepted.length;
          while (rest > 0 && i >= 0) {
            if (rest >= Helper.accepted[i]) {
                console.log(rest);
              cashback += this.identifyCoin(
                Helper.accepted[i],
                Helper.accepted[i] >= 1 ? "$" : "c"
              );
              rest -= Helper.accepted[i];
              rest = rest.toFixed(2);
            } else {
              i--;
            }
          }
        }
        Helper.createAlert(
          `You got "${Helper.selectedItem[0]}" for ${
            Helper.selectedItem[1]
          }$ and the rest of your money is ${restcopy}$
          <img src="${Helper.selectedItem[2]}"> 
          <div class="flex">${cashback}</div>`,
          "OK"
        );
        Helper.selectedItem = "";
        Helper.coins = [];
        Helper.total = 0;
        const WAITING_NEW_CUSTOMER = new NewCustomer();
        Helper.screenOutPut(`Use Keypad To Select Any Item`);
        Helper.currentState = WAITING_NEW_CUSTOMER;
      }
    } else {
      Helper.screenOutPut(
        `<span class='danger'>we only accept ${Helper.accepted.join(
          "$ "
        )}$ only USD</span>`
      );
      setTimeout(() => {
        Helper.screenOutPut(
          `your total : <span class="screenprice"> ${Helper.total.toFixed(
            2
          )}$</span> /  ${Helper.selectedItem[1]}`
        );
      }, 5500);

      Helper.createAlert(
        `The machine gave you back ${this.identifyCoin(val, cur)}`,
        "collect"
      );
    }
  }

  identifyCoin(val, cur) {
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
    return cashback;
  }
}
