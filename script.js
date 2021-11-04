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