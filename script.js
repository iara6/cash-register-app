/* let price = 1.87; */
let price = 19.5;
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

const cidSum = cid.reduce((acc, [_, amount]) => acc + amount, 0);
const roundedCidSum = parseFloat(cidSum.toFixed(2));

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

/* penny.textContent = cid[0][1];  */
 
const moneyValues = document.getElementsByTagName("span");
/* 
[...moneyValues].forEach((value, index) => {
  value.textContent = `${cid[index][1]}`
}); */

const limit = Math.min(moneyValues.length, cid.length); // get the smaller of the two lengths

for (let i = 0; i < limit; i++) {
  moneyValues[i].textContent = `$${cid[i][1]}`; 
  };

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
    /* console.log(Number(cash.value).toFixed(2));
    console.log(Number(total.textContent));   */
    alert('Customer does not have enough money to purchase the item');
  }
};

function preciseCash() {
  if (parseFloat(Number(cash.value).toFixed(2)) === price) {
    result.style.display = "block";
    result.textContent = "No change due - customer paid with exact cash";
  }
}

function checkStatus() {
  const change = parseFloat((Number(cash.value) - price).toFixed(2)); 
  console.log(roundedCidSum);
  console.log(change); 
  
  if (roundedCidSum < change /* || roundedCidSum !== change */) {
    result.style.display = "block";
    result.textContent = "Status: INSUFFICIENT_FUNDS";  
  } 

  if (roundedCidSum === change) { 
    result.style.display = "block";
    result.textContent = "Status: CLOSED";  
  }

  if (roundedCidSum > change && parseFloat(Number(cash.value).toFixed(2)) !== price) { 
    result.style.display = "block";
    result.textContent = "Status: OPEN";  
  }

  if (roundedCidSum > change && parseFloat(Number(cash.value).toFixed(2)) !== price) { 
    result.style.display = "block";
    result.textContent = "Status: OPEN";  
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