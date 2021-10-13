displayFirstHalf = document.querySelector(".first-half");
displaySecondHalf = document.querySelector(".second-half");
clearButton = document.querySelector("#clear");
deleteButton = document.querySelector("#delete");
numericButtonList = document.querySelectorAll(".numeric");
operatorButtonList = document.querySelectorAll(".operator-class");
console.log(numericButtonList);
let num1 = "";
let num2 = "";
let currentOperator = "";
let operatorArray = ["+", "-", "x", "/"];
startCalculator();

function startCalculator() {
  addListeners();
}

// add event listeners to all buttons
function addListeners() {
  clearButton.addEventListener("click", clearScreen);
  deleteButton.addEventListener("click", deleteDigit);
  numericButtonList.forEach((numericButton) => {
    numericButton.addEventListener("click", changeInput);
  });
  operatorButtonList.forEach((operatorButton) => {
    operatorButton.addEventListener("click", changeOperator);
  });
}

function changeInput(e) {
  if (
    currentOperator === "" &&
    (!num1.toString().includes(".") || e.target.innerText !== ".")
  ) {
    num1 += e.target.innerText;

    display(num1);
  } else if (!num2.toString().includes(".") || e.target.innerText !== ".") {
    num2 += e.target.innerText;

    displaySecondInput(num2);
  }
}

function changeOperator(e) {
  console.log("number 2 here is" + num2);
  if (num1 === "") {
    currentOperator = "";
  } else {
    if (num1 !== "" && num2 !== "") {
      num1 = calculate(currentOperator, num1, num2);
      console.log("num1 after is:" + num1);
      if (countDecimals(num1) >= 2) {
        num1 = num1.toFixed(2);
      }
      display(num1);
      num2 = "";
      displaySecondInput(num2);
    }
    if (e.target.innerText !== "=") {
      currentOperator = e.target.innerText;
      console.log(currentOperator);
      display(currentOperator);
    } else {
      currentOperator = "";
    }
  }
}

function clearScreen(e) {
  startCalculator();
  display("");
  displaySecondInput("");
  num1 = "";
  num2 = "";
  currentOperator = "";
}

function deleteDigit(e) {
  if (num2 !== "") {
    num2 = num2.slice(0, -1);
    displaySecondInput(num2);
  }
  console.log("currentOperator is" + currentOperator);
  if (currentOperator === "") {
    if (num1 !== "") {
      console.log(typeof num1);
      num1 = num1.toString().slice(0, -1);
      display(num1);
    }
  }
}

function display(input) {
  if (operatorArray.includes(input)) {
    if (
      operatorArray.includes(
        displayFirstHalf.innerText[displayFirstHalf.innerText.length - 1]
      )
    ) {
      displayFirstHalf.innerText = displayFirstHalf.innerText.slice(0, -1);
    }
    displayFirstHalf.innerText += input;
  } else {
    displayFirstHalf.innerText = input;
  }
}

function displaySecondInput(input) {
  displaySecondHalf.innerText = input;
}

// math logic
function add(num1, num2) {
  num1 = +num1 + +num2;
  return num1;
}

function subtract(num1, num2) {
  num1 = +num1 - +num2;
  return num1;
}

function multiply(num1, num2) {
  num1 = +num1 * +num2;

  return num1;
}

function divide(num1, num2) {
  num1 = +num1 / +num2;
  return num1;
}

function calculate(currentOperator, num1, num2) {
  switch (currentOperator) {
    case "+":
      return add(num1, num2);

    case "-":
      return subtract(num1, num2);

    case "x":
      return multiply(num1, num2);

    case "/":
      return divide(num1, num2);
  }
}

function countDecimals(value) {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
}

//bugs to be fixed :
// currentOperator not getting deleted
// infinity shouldn't let any more data be directly added to it
