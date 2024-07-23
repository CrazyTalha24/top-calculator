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
    let result;
    switch (operator) {
        case '+':
            result =  add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case 'x':
            result = multiply(a, b);
            break;
        case '÷':
            result = divide(a, b);
            break;
        default:
            return null;
    }

    return roundResult(result);

}

function roundResult(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let resetDisplay = false;
let isIntermediateResult = false;


const display = document.querySelector('.display h1');
const buttons = document.querySelectorAll('button');

function clearDisplay() {
    display.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    resetDisplay = false;
    isIntermediateResult = false;
}

function updateDisplay(value) {
    display.textContent = value;
}

function handleNumber(number) {
    if (isIntermediateResult) {
        firstNumber = number;
        secondNumber = '';
        currentOperator = null;
        isIntermediateResult = false;
    }
    if (number === '.' && ((currentOperator === null && firstNumber.includes('.')) || (currentOperator !== null && secondNumber.includes('.')))) {
        return; // Prevent multiple decimal points
    }

    if (resetDisplay || currentOperator === null) {
        if (currentOperator === null) {
            firstNumber += number;
            updateDisplay(firstNumber);
        } else {
            if (resetDisplay) {
                secondNumber = number;
            } else {
                secondNumber += number;
            }
            updateDisplay(secondNumber);
        }
    } else {
        secondNumber += number;
        updateDisplay(secondNumber);
    }
    resetDisplay = false;
}

function handleOperator(operator) {
    if (currentOperator !== null && secondNumber !== '') {
        firstNumber = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
        secondNumber = '';
        updateDisplay(firstNumber);
        // isIntermediateResult = true;
    } else if (currentOperator !== null && secondNumber === '' && !isIntermediateResult) {
        currentOperator = operator;
        return;
    }
    currentOperator = operator;
    resetDisplay = true;
    isIntermediateResult = false;
}

function handleEqual() {
    if (currentOperator === null || secondNumber === '') return;

    firstNumber = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
    currentOperator = null;
    secondNumber = '';
    updateDisplay(firstNumber);

    resetDisplay = true;
    isIntermediateResult = true;
}

function handleSign() {
    if (currentOperator === null) {
        firstNumber = (parseFloat(firstNumber) * -1).toString();
        updateDisplay(firstNumber);
    } else if (secondNumber !== '') {
        secondNumber = (parseFloat(secondNumber) * -1).toString();
        updateDisplay(secondNumber);
    }
}

function handlePercent() {
    if (currentOperator === null) {
        // Handle percent for the first number
        firstNumber = (parseFloat(firstNumber) / 100).toString();
        updateDisplay(firstNumber);
    } else if (secondNumber !== '') {
        // Handle percent for the second number
        secondNumber = (parseFloat(secondNumber) / 100).toString();
        updateDisplay(secondNumber);
    }
}

function handleClear() {
    clearDisplay();
}

function handleDelete() {
    if (isIntermediateResult) {
        return;
    }

    if (currentOperator === null) {
        firstNumber = firstNumber.slice(0, -1);
        updateDisplay(firstNumber);
    } else if (secondNumber !== '') {
        secondNumber = secondNumber.slice(0, -1);
        updateDisplay(secondNumber);
    }
}

function handleButtonClick(event) {
    const value = event.target.textContent;
    if (!isNaN(value) || value === '.') {
        handleNumber(value);
    } else if (value === 'C') {
        handleClear();
    } else if (value === 'DE') {
        handleDelete();
    } else if (value === '=') {
        handleEqual();
    } else if (value === '%') {
        handlePercent();
    } else if (value === '( )') {
        handleSign();
    } else {
        handleOperator(value);
    }
}

function handleKeyboardInput(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        handleNumber(key);
    } else if (key === '.') {
        handleNumber(key);
    } else if (key === '+') {
        handleOperator('+');
    } else if (key === '-') {
        handleOperator('-');
    } else if (key === '*') {
        handleOperator('*');
    } else if (key === '/') {
        handleOperator('/');
    } else if (key === 'Enter') {
        handleEqual();
    } else if (key === 'Escape' || key === 'C') {
        handleClear();
    } else if (key === 'Backspace') {
        handleDelete();
    } else if (key === '%') {
        handlePercent();
    } else if (key === '+') { // Assuming "+/-" is the button text for toggling sign
        handleSign();
    }
}

buttons.forEach(button => button.addEventListener('click', handleButtonClick));
document.addEventListener('keydown', handleKeyboardInput);

clearDisplay();