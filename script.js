const numberButtons = document.querySelectorAll('.number-button');
const calculationsDisplayArea = document.querySelector('.calculations-display-area');
const operators = document.querySelectorAll('.operator');
const calculateButton = document.querySelector('.calculate-button');
const calculationsRecentHistory = document.querySelector('.calculations-recent-history');
const clearButton = document.querySelector('.clear');
const backspaceButton = document.querySelector('.backspace');

let firstNumber = 0;
let operator;
let secondNumber = 0;
let result = 0;

const displayNumber = e => {
    const number = e.target.innerText;
    calculationsDisplayArea.value += number;
    if (!operator) {
        firstNumber += number;
        parseFloat(firstNumber)
        firstNumber = !firstNumber ? 0 : firstNumber;
    } else {
        secondNumber += number;
        parseFloat(secondNumber);
    }
};

const setOperator = e => {
    if (!operator) {
        if (e.target.classList.contains('basic-operator')) {
            calculationsDisplayArea.value += e.target.innerText;
            operator = e.target.innerText;
        } else if (e.target.matches('.cube-operator')) {
            operator = '³';
            calculationsDisplayArea.value += '³'
        } else if (e.target.matches('.square-operator')) {
            operator = '²'
            calculationsDisplayArea.value += '²'
        }
    };
}

const performCalculations = () => {
    calculationsRecentHistory.innerText = calculationsDisplayArea.value;
    switch (operator) {
        case '+':
            result = parseFloat(firstNumber) + parseFloat(secondNumber);
            break;
        case '-':
            result = parseFloat(firstNumber) - parseFloat(secondNumber);
            break;
        case 'x':
            result = parseFloat(firstNumber) * parseFloat(secondNumber);
            break;
        case '÷':
            result = parseFloat(firstNumber) / parseFloat(secondNumber);
            break;
        case '²':
            result = parseFloat(firstNumber) ** 2;
            break;
        case '³':
            result = parseFloat(firstNumber) ** 3;
            break;
    }
    calculationsDisplayArea.value = +result.toFixed(9)
    firstNumber = result || 0;
    secondNumber = 0;
    operator = undefined;
};

const clearCalculator = () => {
    calculationsDisplayArea.value = '';
    firstNumber = 0;
    secondNumber = 0;
    operator = undefined;
    calculationsRecentHistory.innerText = '';
};

const removeCharacter = () => {
    if (!secondNumber && !operator) {
        firstNumber = parseFloat(String(firstNumber).slice(0, -1));
        const updatedCalculationsValue = String(calculationsDisplayArea.value).slice(0, -1);
        firstNumber = !firstNumber ? 0 : firstNumber;
        calculationsDisplayArea.value = updatedCalculationsValue;
    } else if (!secondNumber) {
        operator = undefined;
        const updatedCalculationsValue = String(calculationsDisplayArea.value).slice(0, -1);
        calculationsDisplayArea.value = updatedCalculationsValue;
    } else {
        secondNumber = parseFloat(String(secondNumber).slice(0, -1));
        const updatedCalculationsValue = String(calculationsDisplayArea.value).slice(0, -1);
        calculationsDisplayArea.value = updatedCalculationsValue;
    }
};

operators.forEach(operator => {
    operator.addEventListener('click', setOperator);
});

numberButtons.forEach(button => {
    button.addEventListener('click', displayNumber);
});

calculateButton.addEventListener('click', performCalculations);

clearButton.addEventListener('click', clearCalculator);

backspaceButton.addEventListener('click', removeCharacter);
