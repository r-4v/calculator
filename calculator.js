displayFirstHalf = document.querySelector(".first-half");
displaySecondHalf =  document.querySelector(".second-half");
clearButton = document.querySelector("#clear");
deleteButton = document.querySelector('#delete');
numericButtonList = document.querySelectorAll(".numeric");
operatorButtonList = document.querySelectorAll(".operator");
console.log(numericButtonList);
let num1 = "";
let num2 = "";
let operator = "";
let operators = ['+', '-','x','/'];

addListeners();

// add event listeners to all buttons
function addListeners(){
clearButton.addEventListener("click",clearData);
deleteButton.addEventListener("click",deleteDigit);
numericButtonList.forEach(numericButton => {
    numericButton.addEventListener("click",operandUpdate);
    
});
operatorButtonList.forEach((operatorButton) =>{
    operatorButton.addEventListener("click",operatorUpdate);
})

}

function operandUpdate(e){
    if(operator === "")
    { if(!(num1.includes("."))||e.target.innerText!=="."){
    num1 += e.target.innerText;
    console.log(num1);
    displayInput(num1);}
}
    else{
        if(!(num2.includes("."))||e.target.innerText!=="."){
        num2 += e.target.innerText;
        console.log("number 2 is" + num2);
        console.log("number 1 is "+num1);
        displaySecondOperand(num2);
    }}
}
function operatorUpdate(e){
    if(num1 != "" && num2 != ""){
        num1 = operate(operator,num1,num2)
        if(countDecimals(num1) >= 2){
            num1 = num1.toFixed(2);
        }
        displayInput(num1);
        num2 = "";
        displaySecondOperand(num2);
        console.log("num1 ="+num1);
    }
    if(e.target.innerText !== "=" )
    {operator = e.target.innerText;
    console.log(operator);
    displayInput(operator);}
    
}
function clearData(e){
    let input = "";
    console.log(input);
    displayInput(input);
    displaySecondOperand(input);
    num1 = "";
    num2 = "";
}
function deleteDigit(e){
    let input = e.target.innerText;
    console.log(input);
    displayInput(input);
}


function displayInput(input){
    //console.log("input is"+input);
    
    if(operators.includes(input)){
        if(operators.includes(displayFirstHalf.innerText[displayFirstHalf.innerText.length-1])){
            displayFirstHalf.innerText = displayFirstHalf.innerText.slice(0,-1);
            
        }
        displayFirstHalf.innerText += input;
    }
    else{
        displayFirstHalf.innerText = input;
    }
}
function displaySecondOperand(input){
    displaySecondHalf.innerText= input;
}

















































// math logic
function add(num1,num2){
    num1 = (+num1)+(+num2);
    return num1;
}
function subtract(num1,num2){
    num1 = (+num1)-(+num2);
    return num1;
}
function multiply(num1,num2){
    num1 = (+num1)*(+num2);
    return num1;
}
function divide(num1,num2){
    num1 = (+num1)/(+num2);
    return num1;
}
function operate(operator , num1,num2){
    switch(operator){
        case "+":   return add(num1,num2);
                    
        case "-":   return subtract(num1,num2);
                    
        case "x":   return multiply(num1,num2);
                    
        case "/":   return divide(num1,num2);             
    }
}

function countDecimals(value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
}