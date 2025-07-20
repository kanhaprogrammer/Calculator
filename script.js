let display = document.getElementById("display");
let historyList = document.getElementById("historyList");

// Calculator Functions
function appendNumber(num) {
  if (display.innerText === "0") display.innerText = num;
  else display.innerText += num;
}

function appendOperator(op) {
  const lastChar = display.innerText.slice(-1);
  if ("+-*/%".includes(lastChar)) {
    display.innerText = display.innerText.slice(0, -1) + op;
  } else {
    display.innerText += op;
  }
}

function appendDot() {
  const parts = display.innerText.split(/[\+\-\*\/%]/);
  const last = parts[parts.length - 1];
  if (!last.includes(".")) {
    display.innerText += ".";
  }
}

function clearDisplay() {
  display.innerText = "0";
}

function deleteLast() {
  if (display.innerText.length === 1) display.innerText = "0";
  else display.innerText = display.innerText.slice(0, -1);
}

function calculate() {
  try {
    let result = eval(display.innerText);
    historyList.innerHTML = `<li>${display.innerText} = ${result}</li>` + historyList.innerHTML;
    display.innerText = result;
  } catch {
    display.innerText = "Error";
  }
}

// Keyboard Support
document.addEventListener("keydown", function (e) {
  const key = e.key;
  if (!isNaN(key)) appendNumber(key);
  else if ("+-*/%".includes(key)) appendOperator(key);
  else if (key === "." || key === ",") appendDot();
  else if (key === "Enter" || key === "=") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") deleteLast();
  else if (key === "Delete") clearDisplay();
});

// Tab Switching
function switchTab(tab) {
  document.getElementById("calcPanel").classList.toggle("hidden", tab !== "calc");
  document.getElementById("converterPanel").classList.toggle("hidden", tab !== "converter");

  document.getElementById("calcTab").classList.toggle("active", tab === "calc");
  document.getElementById("convTab").classList.toggle("active", tab === "converter");
}

// Currency Converter
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultBox = document.getElementById("convertedResult");

// Load currency list
const currencyList = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "SGD", "CNY", "AED"];
currencyList.forEach(code => {
  fromCurrency.innerHTML += `<option value="${code}">${code}</option>`;
  toCurrency.innerHTML += `<option value="${code}">${code}</option>`;
});
fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (amount === "") {
    resultBox.innerText = "Please enter amount!";
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    resultBox.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch {
    resultBox.innerText = "API Error. Try again later.";
  }
}
