const statusLabel = document.querySelector("#status-label > span");
const totalCIDLabel = document.querySelector("#total-cid-label > span");
const priceLabel = document.getElementById("price-label");
const cashInput = document.getElementById("cash-input");
const purchaseBtn = document.getElementById("purchase-btn");
const changeLabel = document.querySelector("#change-due > span");
const CIDCashValues = document.getElementById("cash-values");

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const fix = (num) => +num.toFixed(2);

class CashDrawer {
  constructor(cid) {
    this.cash = cid;
    this.changeState();
  }
  get(unit, amount) {
    let arr =
      this.cash[this.cash.findIndex((el) => el[0] === unit.toUpperCase())];
    let availableAmount = arr[1];
    let output;
    if (availableAmount >= amount) {
      output = amount;
      arr[1] = fix(arr[1] - amount);
    } else if (availableAmount < amount) {
      output = availableAmount;
      arr[1] = 0;
    }
    if (arr[1] < 0) arr[1] = 0;
    return output;
  }
  getTotal = () => this.cash.reduce((acc, [, amount]) => fix(acc + amount), 0);

  changeState(msg) {
    let total = this.getTotal();
    totalCIDLabel.textContent = total;
    if (msg) statusLabel.textContent = "INSUFFICIENT-FUNDS";
    else if (total <= 0) statusLabel.textContent = "CLOSED";
    else if (total > 0) statusLabel.textContent = "OPEN";
    CIDCashValues.innerHTML = "";
    for (let i = cid.length - 1; i >= 0; i--) {
      CIDCashValues.innerHTML += `<p>${cid[i][0]}: $${cid[i][1]}</p>`;
    }
  }
}
const cd = new CashDrawer(cid);
priceLabel.textContent = `$${price ?? 0}`;

function calculateChange() {
  const cash = +cashInput.value;
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  if (cash === price) {
    changeLabel.textContent = "No change due - customer paid with exact cash";
    return;
  }
  let change = fix(cash - price);
  let cidCopy = copy2DArray(cid);
  cd.cash = cidCopy;
  changeLabel.innerHTML = "";

  if (change > cd.getTotal()) {
    cd.changeState("INSUFFICIENT-FUNDS");
    return;
  }

  for (let i = cidCopy.length - 1; i >= 0; i--) {
    let currencyUnit = cidCopy[i][0];
    let currencyValue;
    switch (currencyUnit) {
      case "ONE HUNDRED":
        currencyValue = 100;
        break;
      case "TWENTY":
        currencyValue = 20;
        break;
      case "TEN":
        currencyValue = 10;
        break;
      case "FIVE":
        currencyValue = 5;
        break;
      case "ONE":
        currencyValue = 1;
        break;
      case "QUARTER":
        currencyValue = 0.25;
        break;
      case "DIME":
        currencyValue = 0.1;
        break;
      case "NICKEL":
        currencyValue = 0.05;
        break;
      case "PENNY":
        currencyValue = 0.01;
        break;
    }
    let gained = cd.get(
      currencyUnit,
      Math.floor(change / currencyValue) * currencyValue
    );

    change = fix(change - gained);
    if (gained) changeLabel.innerHTML += `<br>${currencyUnit}: ${gained}`;
  }
  //   console.log(this.cash, cid);
  if (change >= 0.01) {
    cd.cash = cid;
    cd.changeState("INSUFFICIENT-FUNDS");
    changeLabel.textContent = ""
  } else {
    cid = cidCopy;
    cd.changeState();
  }
  cidCopy = null;
}
function copy2DArray(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    res[i] = [...arr[i]];
  }
  return res;
}
purchaseBtn.addEventListener("click", calculateChange);
