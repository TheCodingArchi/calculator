const numbersBtn = document.querySelectorAll('.numbers');
const resultsDisplay = document.querySelector('.result-display');

numbersBtn.forEach(displayNumber);


function displayNumber(number) {
    number.addEventListener('click', () => {
        resultsDisplay.textContent += number.id;
        if (number.id === '.') {
            number.disabled = true;
            number.classList.add('disabled');
        }
    });
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