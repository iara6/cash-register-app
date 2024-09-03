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

console.log('roundedCidSum');
console.log(roundedCidSum);
// 335.41

const penny = document.getElementById("penny");
const nickel = document.getElementById("nickel");
const dime = document.getElementById("dime");
const quarter = document.getElementById("quarter");
const one = document.getElementById("one");
const five = document.getElementById("five");
const ten = document.getElementById("ten");
const twenty = document.getElementById("twenty");
const oneHundred = document.getElementById("one-hundred");

const total = document.querySelector('.total-price');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const result = document.getElementById('change-due');

const moneyValues = document.getElementsByTagName("span");
/* 
[...moneyValues].forEach((value, index) => {
value.textContent = `${cid[index][1]}`
}); */

const change = parseFloat((Number(cash.value) - price).toFixed(2));

document.addEventListener('DOMContentLoaded', () => {
  const limit = Math.min(moneyValues.length, cid.length); // get the smaller of the two lengths
  for (let i = 0; i < limit; i++) {
  moneyValues[i].textContent = `$${cid[i][1]}`; 
};
});

total.textContent = price;

/* ************************************ */
purchaseBtn.addEventListener("click", () => {
  notEnoughCash();
  preciseCash();
  checkStatus();  
  checkQuarter();

});
/* ************************************ */

function notEnoughCash() {
  if (parseFloat(Number(cash.value).toFixed(2)) < price) {
    result.style.display = "none";
    alert('Customer does not have enough money to purchase the item');
  }
};

function preciseCash() {
  if (parseFloat(Number(cash.value).toFixed(2)) === price) {
    result.style.display = "block";
    result.textContent = "No change due - customer paid with exact cash";
  }
};

function checkStatus() { 
  const change = parseFloat((Number(cash.value) - price).toFixed(2));
  console.log('roundedCidSum in checkStatus()');
  console.log(roundedCidSum);
  console.log('change in checkStatus()');
  console.log(change); 

  if (roundedCidSum < change /* || roundedCidSum !== change */) {
    result.style.display = "block";
    result.textContent = "Status: INSUFFICIENT_FUNDS";  
  }; 

  if (roundedCidSum === change) { 
    result.style.display = "block";
    result.textContent = "Status: CLOSED";  
  };

  if (roundedCidSum > change && parseFloat(Number(cash.value).toFixed(2)) !== price && parseFloat(Number(cash.value).toFixed(2)) - price !== 0.5 && parseFloat(Number(cash.value).toFixed(2)) > price) { 
    result.style.display = "block";
    result.textContent = "Status: OPEN";  
   /*  changeDue(); */
  }
};

function checkQuarter() {
  if (parseFloat(Number(cash.value).toFixed(2)) - price === 0.5) {
    let quarterVal = cid[3][1] - 0.5;
    quarter.textContent = `$${quarterVal}`;
    result.style.display = "block";
    result.innerHTML = `Status: OPEN <br>QUARTER: $0.5`;  
  }
};
/* for (let i = 0; i < limit; i++) {
if (cid[i][1] - price === 0.5) {
result.style.display = "block";
result.textContent = "Status: OPEN QUARTER: $0.5";  
}
}; */

/* https://stackoverflow.com/questions/41764061/adding-text-to-an-existing-text-element-in-javascript-via-dom */


function changeDue() {
/* roundedCidSum, cash.value */
let changeArray = [];

let cidObj = {};
cid.reverse().forEach((item) => {
cidObj[item[0]] = item[1];
});
/* console.log(cidObj); */
/* { 'ONE HUNDRED': 100,
TWENTY: 60,
TEN: 20, */
for (let i = 0; i < currencyUnit.length; i++) {
let currencyName = currencyUnit[i][0];
let currencyValue = currencyUnit[i][1];
let availableAmount = cidObj[currencyName];
/* console.log(availableAmount);
100 60 20 */
let amountNeeded = Math.floor(change / currencyValue) * currencyValue;
/* console.log(amountNeeded); */
if (availableAmount>0 && amountNeeded>0){
let amountToReturn = Math.min(availableAmount, amountNeeded);
change -= amountToReturn;
change = Math.round(change * 100) / 100; 
changeArray.push([currencyName, amountToReturn]);
}
};
console.log(changeArray);

};


