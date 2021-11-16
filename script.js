const numbersBtn = document.querySelectorAll('.numbers');
const resultsDisplay = document.querySelector('.result-display');
const resultProcessDisplay = document.querySelector('.result-process-display');
const plusMinusBtn = document.querySelector('.plus-minus');
const operatorsBtn = document.querySelectorAll('.operator');
const evaluator = document.querySelector('.equals-sign');

let operand1 = '';
let operand2 = '';
let operatorSign = '';
let result = '';
let operatorTracker = 0;
let evaluatorTracker = 0;

function initializeCalculator() {
    numbersBtn.forEach(displayNumber);
    operatorsBtn.forEach(activateOperator);
    evaluator.addEventListener('click', evaluate);
    window.addEventListener('keydown', (e) => {
        getKeyboardInput(e.key);
    });

    clearScreenContent();
    inputNegativeNumber();
}

function displayNumber(number) {
    number.addEventListener('click', () => {
        if (resultsDisplay.innerText === '0') {
            resultsDisplay.innerText = '';
        }
        if (evaluatorTracker > 0) {
            clearAll();
            resultsDisplay.innerText = '';
        }
        if (operatorTracker > 0) {
            enableButtons(operatorsBtn);
            enableButtons(numbersBtn);
            resultsDisplay.innerText = '';
            operatorTracker = 0;

            if (plusMinusBtn.classList.contains('minus')) {
                plusMinusBtn.classList.toggle('minus');
            }
        }
        resultsDisplay.innerText += number.id;
        if (number.id === '0.') {
            number.disabled = true;
        }
        if (resultsDisplay.innerText.length > 13) {
            disableButtons(numbersBtn);
        }
    });
}

function inputNegativeNumber() {
    plusMinusBtn.addEventListener('click', () => {
        if (plusMinusBtn.classList.contains('minus')) {
            resultsDisplay.innerText = resultsDisplay.innerText.slice(1);
            plusMinusBtn.classList.toggle('minus');
        }
        else {
            resultsDisplay.innerText = prefixMinus(resultsDisplay.innerText);
            plusMinusBtn.classList.toggle('minus');
        }
    });
}

function prefixMinus(str) {
    let minus = '-';
    return minus.concat(str);
}

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

function clearAll() {
    evaluator.disabled = false;
    resultProcessDisplay.innerText = '';
    resultsDisplay.innerText = 0;
    operatorTracker = 0;
    evaluatorTracker = 0;
    operand1 = '';
    operand2 = '';
    operatorSign = '';
    result = '';
    enableDot();
    enableButtons(operatorsBtn);
    enableButtons(numbersBtn);
    if (plusMinusBtn.classList.contains('minus')) {
        plusMinusBtn.classList.toggle('minus');
    }
}

function clearEntry() {
    resultsDisplay.innerText = 0;
}

function backspace() {
    let length = resultsDisplay.innerText.length;
    resultsDisplay.textContent = resultsDisplay.innerText.slice(0, length -1);
    if (length === 1) {
        resultsDisplay.textContent = 0;
    }
}

function activateOperator(operator) {
    operator.addEventListener('click', () => {
        if (operator.classList.contains('single-operand')) {
            useSingleOperand(operator);
        }
        else {
            useDoubleOperand(operator);
        }
        enableButtons(numbersBtn);
        operatorTracker += 1;
    });
}

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

function enableDot() {
    numbersBtn.forEach(number => {
        if (number.id === '.') {
            if (number.disabled) {
                number.disabled = false;
            }
        }
    });
}

function useDoubleOperand(operator) {
    if (evaluatorTracker === 0 && operand1 != '') {
        operand2 = Number(resultsDisplay.innerText);
        result = operateDoubleOperand(operatorSign, operand1, operand2);
        resultsDisplay.innerText = formatToPrecision(result)
        resultProcessDisplay.innerText = ` ${resultsDisplay.innerText} ${operator.id}`;
        operand1 = Number(resultsDisplay.innerText);
        operatorSign = operator.id;
    }
    else if (evaluatorTracker > 0) {
        operand1 = Number(resultsDisplay.innerText);
        operatorSign = operator.id;
        resultProcessDisplay.innerText = `${operand1} ${operator.id}`;
        evaluatorTracker = 0;
        evaluator.disabled = false;
    }
    else {
        operand1 = Number(resultsDisplay.innerText);
        operatorSign = operator.id;
        resultProcessDisplay.innerText = `${operand1} ${operator.id}`;
    }
    disableButtons(operatorsBtn);
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
    result= operateSingleOperand(operatorSign, operand);
    resultsDisplay.innerText = formatToPrecision(result);
    evaluatorTracker += 1;
    evaluator.disabled = true;
}

function evaluate() {
    operand2 = Number(resultsDisplay.innerText);
    resultProcessDisplay.innerText += ` ${operand2} ${evaluator.id}`;
    result = operateDoubleOperand(operatorSign, operand1, operand2);
    resultsDisplay.innerText = formatToPrecision(result);
    evaluatorTracker += 1;
    evaluator.disabled = true;
    plusMinusBtn.classList.toggle('minus');
}

function formatToPrecision(num) {
    return num.toString().length > 10 ? num.toPrecision(10) : num;
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

function divide(a, b) {
    if (b === 0) {
        clearAll();
        resultsDisplay.innerText = 'Cannot divide by Zero';
    }
    else {
        return a / b;
    }
}

const sum = (a, b) => (a * 10 + b * 10) / 10;
const subtract = (a, b) => a - b;
const multiply = (a, b) => ((a * 10) * (b * 10)) / 100;
const power = (a, b) => Math.pow(a, b);
const squareRoot = n => Math.sqrt(n);

// keyboard support
function getKeyboardInput(key) {
    const specialInput = {
        'Enter': '=',
        'Backspace': 'backspace',
        'Delete': 'clear-all',
        'ArrowLeft': 'clear-entry',
        '$': 'sqrt',
        '.': '0.',
        'Tab': '-+',
        '*': 'x'
    };

    if (key in specialInput) {
        key = specialInput[key];
    }

    const button = document.querySelector(`button[id="${key}"]`);
    button.click();
}

initializeCalculator();