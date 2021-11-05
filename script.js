const numbersBtn = document.querySelectorAll('.numbers');
const resultsDisplay = document.querySelector('.result-display');
const resultProcessDisplay = document.querySelector('.result-process-display');
const plusMinusBtn = document.querySelector('.plus-minus');
const operatorsBtn = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.equals-sign');
let operand1 = '';
let operand2 = '';
let operatorSign = '';

numbersBtn.forEach(displayNumber);
operatorsBtn.forEach(activateOperator);
equalsBtn.addEventListener('click', evaluate)

function displayNumber(number) {
    number.addEventListener('click', () => {
        resultsDisplay.innerText += number.id;
        if (number.id === '.') {
            number.disabled = true;
        }
    });
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
        operand1 = Number(resultsDisplay.innerText);
        operatorSign = operator.id;
        resultProcessDisplay.innerText = `${operand1} ${operator.id}`;
        resultsDisplay.innerText = '';
        enableDot();
    });
}

function evaluate() {
    operand2 = Number(resultsDisplay.innerText);
    resultProcessDisplay.innerText += ` ${operand2} ${equalsBtn.id}`;
    resultsDisplay.innerText = operateDoubleOperand(operatorSign, operand1, operand2);
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