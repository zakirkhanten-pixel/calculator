let display = document.getElementById('display');
let currentValue = '';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }

    if (value === '.') {
        if (!display.value.includes('.')) {
            display.value += value;
            currentValue = display.value;
        }
    } else {
        display.value += value;
        currentValue = display.value;
    }
}

function clearDisplay() {
    display.value = '';
    currentValue = '';
    previousValue = '';
    operation = null;
    shouldResetDisplay = false;
}

function calculate() {
    if (operation && currentValue && previousValue) {
        let result;
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current !== 0 ? prev / current : 'Error';
                break;
            default:
                return;
        }

        display.value = result;
        currentValue = result.toString();
        previousValue = '';
        operation = null;
        shouldResetDisplay = true;
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '.') {
        appendToDisplay('.');
    } else if (event.key === '+' || event.key === '-') {
        handleOperation(event.key);
        event.preventDefault();
    } else if (event.key === '*') {
        handleOperation('*');
        event.preventDefault();
    } else if (event.key === '/') {
        handleOperation('/');
        event.preventDefault();
    } else if (event.key === 'Enter') {
        calculate();
        event.preventDefault();
    } else if (event.key === 'Backspace') {
        display.value = display.value.slice(0, -1);
        currentValue = display.value;
        event.preventDefault();
    } else if (event.key === 'c' || event.key === 'C') {
        clearDisplay();
        event.preventDefault();
    }
});

function handleOperation(op) {
    if (currentValue === '') return;
    
    if (previousValue && operation && !shouldResetDisplay) {
        calculate();
    }
    
    previousValue = currentValue;
    currentValue = '';
    operation = op;
    shouldResetDisplay = true;
}