const currencyUnit = [
  ["ONE HUNDRED", 100],
  ["TWENTY", 20],
  ["TEN", 10],
  ["FIVE", 5],
  ["ONE", 1],
  ["QUARTER", 0.25],
  ["DIME", 0.1],
  ["NICKEL", 0.05],
  ["PENNY", 0.01]
];

let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

/* let price = 1.87; */
let price = 19.5;

const cidSum = cid.reduce((acc, [_, amount]) => acc + amount, 0);
const roundedCidSum = parseFloat(cidSum.toFixed(2));
/* console.log(roundedCidSum); */

const total = document.querySelector('.total-price');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');

const verdictDiv = document.querySelector('.verdict');
const resultStatus = document.getElementById('change-due');

let moneyValues = document.querySelectorAll(".currency-value");

const change = parseFloat((Number(cash.value) - price).toFixed(2));

moneyValues = Array.from(moneyValues);
document.addEventListener('DOMContentLoaded', () => {
  moneyValues.forEach((element, index) => {
    element.textContent = `$${cid[index][1]}`;
  }); 
});

total.textContent = price;

cash.addEventListener("keydown", (event) => {
  if (event.key === 'Enter') {
    purchaseBtn.click();
  }
});

/* ************************************ */
purchaseBtn.addEventListener("click", () => {
  notEnoughCash();
  preciseCash();
  checkStatus();  
});
/* ************************************ */

function notEnoughCash() {
  if (parseFloat(Number(cash.value).toFixed(2)) < price) {
    verdictDiv.style.display = "none";
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
  }
};

function preciseCash() {
  if (parseFloat(Number(cash.value).toFixed(2)) === price) {
    verdictDiv.style.display = "block";
    resultStatus.textContent = "No change due - customer paid with exact cash";
    cash.value = '';
  }
};

function checkStatus() { 
  const change = parseFloat((Number(cash.value) - price).toFixed(2));
  const cidSum = cid.reduce((acc, [_, amount]) => acc + amount, 0);
  const roundedCidSum = parseFloat(cidSum.toFixed(2));

  if (roundedCidSum < change) {
    verdictDiv.style.display = "block";
    resultStatus.textContent = "Status: INSUFFICIENT_FUNDS";
    cash.value = '';
    return;
  } else if (roundedCidSum === change) { 
    verdictDiv.style.display = "block";
    resultStatus.textContent = "Status: CLOSED"; 
    changeDue(change);
    return;
  } else if (roundedCidSum > change && parseFloat(Number(cash.value).toFixed(2)) !== price && parseFloat(Number(cash.value).toFixed(2)) > price) { 
    verdictDiv.style.display = "block";
    resultStatus.textContent = "Status: OPEN";  
    changeDue(change);
  }
};

function changeDue(change) {
  let changeArray = [];
  let cidReversed = [...cid].reverse();

  for (let i = 0; i < currencyUnit.length; i++) {
    let currencyName = currencyUnit[i][0];
    let currencyValue = currencyUnit[i][1];
    let availableAmount = cidReversed[i][1];

    let maxPossibleFromUnit = Math.floor(change / currencyValue) * currencyValue;

  if (availableAmount > 0 && maxPossibleFromUnit > 0) {
    let amountToReturn = Math.min(availableAmount, maxPossibleFromUnit);
    change -= amountToReturn;
    change = Math.round(change * 100) / 100;  
    changeArray.push([currencyName, amountToReturn]);
    cidReversed[i][1] -= amountToReturn;
    let originalIndex = cid.length - 1 - i; 
    moneyValues[originalIndex].textContent = `$${cidReversed[i][1]}`;
    }
  };

  if (change > 0) {
    resultStatus.textContent = "Status: INSUFFICIENT_FUNDS";
    cash.value = '';
    return;
  }
  
  let formattedChange = changeArray.map(unit => 
      `${unit[0]}: $${unit[1]}`
    ).join("<br>");
    resultStatus.innerHTML += `<br>${formattedChange}`
    cash.value = '';
};
