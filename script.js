/* BASIC FUNCTIONS */

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'ERROR';
    } else {
        return a / b;
    }
}

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            return null;
    }
}

let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let resetDisplay = false;

const display = document.querySelector('.display h1');
const buttons = document.querySelectorAll('button');

function clearDisplay() {
    display.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    resetDisplay = false;
}

function updateDisplay(value) {
    if (resetDisplay) {
        display.textContent = value;
        resetDisplay = false;
    } else {
        display.textContent = display.textContent === '0' ? value : display.textContent + value;
    }
}

function handleNumber(number) {
    if (currentOperator === null) {
        firstNumber = number;
        updateDisplay(firstNumber);
    } else {
        secondNumber = number;
        updateDisplay(secondNumber);
    }
}

function handleOperator(operator) {
    if (currentOperator !== null) {
        if (secondNumber === '') {
            currentOperator = operator;
            return;
        }
        firstNumber = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
        secondNumber = '';
        updateDisplay(firstNumber);
    }
    currentOperator = operator;
    resetDisplay = true;
}

function handleEqual() {
    if (currentOperator === null || secondNumber === '') return;
    firstNumber = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
    currentOperator = null;
    secondNumber = '';
    updateDisplay(firstNumber);
    resetDisplay = true;
}

function handleClear() {
    clearDisplay();
}

function handleButtonClick(event) {
    const value = event.target.textContent;
    if (!isNaN(value) || value === '.') {
        handleNumber(value);
    } else if (value === 'C') {
        handleClear();
    } else if (value === '=') {
        handleEqual();
    } else {
        handleOperator(value);
    }
}

buttons.forEach(button => button.addEventListener('click', handleButtonClick));

clearDisplay();