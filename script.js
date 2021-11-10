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
        if (resultsDisplay.innerText[0] === '0') {
            resultsDisplay.innerText = resultsDisplay.innerText.slice(1);
        }
        if (evaluatorTracker > 0) {
            clearAll();
            resultsDisplay.innerText = '';
        }
        if (operatorTracker > 0) {
            enableButtons(operatorsBtn);
            enableButtons(numbersBtn);
            clearEntry();
            resultsDisplay.innerText = '';
        }
        resultsDisplay.innerText += number.id;
        if (number.id === '.') {
            number.disabled = true;
        }
        if (resultsDisplay.innerText.length > 13) {
            disableButtons(numbersBtn);
        }
    });
}

// function formatToPrecision(num) {
//     if (num.toString().length >= 15) {
//     return num.toPrecision(14);
//     }
//     return num;
// }

function enableButtons(buttons) {
    buttons.forEach(button => {
        if (button.disabled) {
            button.disabled = false;
        }
    });
}

function disableButtons(buttons) {
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function clearAll() {
    equalsBtn.disabled = false;
    resultProcessDisplay.innerText = '';
    resultsDisplay.innerText = 0;
    operatorTracker = 0;
    evaluatorTracker = 0;
    enableDot();
    enableButtons(operatorsBtn);
    enableButtons(numbersBtn);
}

function clearEntry() {
    resultsDisplay.innerText = 0;
    operatorTracker = 0;
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
        if (operator.classList.contains('single-operand')) {
            useSingleOperand(operator);
        }
        else {
            useDoubleOperand(operator);
        }
        disableButtons(operatorsBtn);
        enableButtons(numbersBtn);
        operatorTracker += 1;
    });
}

function useDoubleOperand(operator) {
    if (operatorTracker > 0 && evaluatorTracker === 0) {
        operand2 = Number(resultsDisplay.innerText);
        resultsDisplay.innerText = operateDoubleOperand(operatorSign, operand1, operand2);
        resultProcessDisplay.innerText = ` ${resultsDisplay.innerText} ${operator.id}`;
        operand1 = resultsDisplay.innerText;
        operatorSign = operator.id;
    }
    else if (operatorTracker > 0 && evaluatorTracker > 0) {
        operand1 = resultsDisplay.innerText;
        resultProcessDisplay.innerText = `${operand1} ${operator.id}`;
        evaluatorTracker = 0;
        equalsBtn.disabled = false;
    }
    else {
        operand1 = Number(resultsDisplay.innerText);
        operatorSign = operator.id;
        resultProcessDisplay.innerText = `${operand1} ${operator.id}`;
    }
    enableDot();
}

function useSingleOperand(operator) {
    let operand = Number(resultsDisplay.innerText);
    if (operator.id === 'sqrt') {
        resultProcessDisplay.innerText = `${operator.id} ${operand}`;
    }
    else {
        resultProcessDisplay.innerText = `${operand}${operator.id}`;
    }
    operatorSign = operator.id;
    resultsDisplay.innerText = operateSingleOperand(operatorSign, operand);
    evaluatorTracker += 1;
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

function operateSingleOperand(operator, operand) {
    if (operator === 'sqrt') return squareRoot(operand);
    return factorial(operand);
}

function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n-1);
}

const sum = (a, b) => (a * 10 + b * 10) / 10;
const subtract = (a, b) => a - b;
const multiply = (a, b) => ((a * 10) * (b * 10)) / 100;
const divide = (a, b) => a / b;
const power = (a, b) => Math.pow(a, b);
const squareRoot = n => Math.sqrt(n);