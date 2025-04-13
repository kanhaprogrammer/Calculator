const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

function appendValue(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let result = eval(display.value.replace(/%/g, "/100"));
    addToHistory(display.value + " = " + result);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

function addToHistory(entry) {
  const li = document.createElement("li");
  li.textContent = entry;
  historyList.prepend(li);
}

// 🌗 Toggle light/dark mode
function toggleMode() {
  document.body.classList.toggle("light-mode");
}

// 🎨 Theme switcher
function switchTheme() {
  const theme = document.getElementById("themeSwitcher").value;
  document.body.classList.remove("theme-blue", "theme-neon");
  if (theme === "blue") document.body.classList.add("theme-blue");
  if (theme === "neon") document.body.classList.add("theme-neon");
}

// ⌨️ Keyboard input support
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (!isNaN(key) || "+-*/.%".includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});

// 💱 Currency converter (INR to selected)
const currencyRates = {
  USD: 0.012,
  EUR: 0.011,
  JPY: 1.6,
};

function convertCurrency() {
  const amount = parseFloat(document.getElementById("currencyInput").value);
  const currency = document.getElementById("currencySelect").value;
  const output = document.getElementById("currencyOutput");

  if (!isNaN(amount)) {
    const converted = (amount * currencyRates[currency]).toFixed(2);
    output.textContent = `Converted: ${converted} ${currency}`;
  } else {
    output.textContent = "Enter a valid amount!";
  }
}
