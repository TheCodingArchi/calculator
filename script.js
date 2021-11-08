const numbersBtn = document.querySelectorAll('.numbers');
const resultsDisplay = document.querySelector('.result-display');
const resultProcessDisplay = document.querySelector('.result-process-display');
const plusMinusBtn = document.querySelector('.plus-minus');
const operatorsBtn = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.equals-sign');

let operand1 = '';
let operand2 = '';
let operatorSign = '';
let operatorTracker = 0;
let evaluatorTracker = 0;

numbersBtn.forEach(displayNumber);
operatorsBtn.forEach(activateOperator);
equalsBtn.addEventListener('click', evaluate)

clearScreenContent();

function clearScreenContent() {
    const clearBtns = document.querySelectorAll('.clear-buttons');
    clearBtns.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id === 'clear-all') {
                clearAll();
            }
            else if (button.id === 'clear-entry') {
                clearEntry();
            }
            else {
                backspace();
            }
        });
    });
}

function displayNumber(number) {
    number.addEventListener('click', () => {
        if (resultsDisplay.innerText === '0') {
            resultsDisplay.innerText = '';
        }
        if (evaluatorTracker > 0) {
            clearAll();
        }
        if (operatorTracker > 0) {
            enableOperator();
            resultsDisplay.innerText = '';
        }
        resultsDisplay.innerText += number.id;
        if (number.id === '.') {
            number.disabled = true;
        }
    });
}

function enableOperator() {
    operatorsBtn.forEach(operator => {
        if (operator.disabled) {
            operator.disabled = false;
        }
    });
}


function clearAll() {
    equalsBtn.disabled = false;
    resultProcessDisplay.innerText = '';
    resultsDisplay.innerText = 0;
    operatorTracker = 0;
    evaluatorTracker = 0;
    enableDot();
    enableOperator();
}

function clearEntry() {
    resultsDisplay.innerText = '';
}

function backspace() {
    let length = resultsDisplay.innerText.length;
    resultsDisplay.textContent = resultsDisplay.innerText.slice(0, length -1);
    if (length === 1) {
        resultsDisplay.textContent = 0;
    }
}

function enableDot() {
    numbersBtn.forEach(number => {
        if (number.id === '.') {
            if (number.disabled) {
                number.disabled = false;
            }
        }
    });
}

function activateOperator(operator) {
    operator.addEventListener('click', () => {
        // if (operatorTracker > 2) {
        //     operand1 = result;
        //     operand2 = resultsDisplay.innerText;
        //     result = operateDoubleOperand(operatorSign, operand1, operand2);
        //     resultsDisplay.innerText = result;
        //     resultProcessDisplay.innerText = ` ${resultsDisplay.innerText} ${operator.id}`;
        // }
        if (operatorTracker > 0) {
            operand2 = Number(resultsDisplay.innerText);
            resultsDisplay.innerText = operateDoubleOperand(operatorSign, operand1, operand2);
            resultProcessDisplay.innerText = ` ${resultsDisplay.innerText} ${operator.id}`;
            operand1 = resultsDisplay.innerText;
            operatorSign = operator.id;
        }
        else {
            operand1 = Number(resultsDisplay.innerText);
            operatorSign = operator.id;
            resultProcessDisplay.innerText = `${operand1} ${operator.id}`;
            resultsDisplay.innerText = '';
        }
        operator.disabled = true;
        operatorTracker += 1;
        enableDot();
    });
}

function evaluate() {
    operand2 = Number(resultsDisplay.innerText);
    resultProcessDisplay.innerText += ` ${operand2} ${equalsBtn.id}`;
    resultsDisplay.innerText = operateDoubleOperand(operatorSign, operand1, operand2);
    evaluatorTracker += 1;
    equalsBtn.disabled = true;
}

function operateDoubleOperand(operator, operand1, operand2) {
    if (operator === '+') return sum(operand1, operand2);
    else if (operator === '-') return subtract(operand1, operand2);
    else if (operator === 'x') return multiply(operand1, operand2);
    else if (operator === '/') return divide(operand1, operand2);
    return power(operand1, operand2);
}

function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n-1);
}

const sum = (a, b) => (a * 10 + b * 10) / 10;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const power = (a, b) => Math.pow(a, b);
const squareRoot = n => Math.sqrt(n);