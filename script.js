let expression = '';

function appendValue(value) {
  expression += value;
  updateResult();
}

function clear() {
  expression = expression.slice(0, -1);
  updateResult();
}

function clearAll() {
  expression = '';
  updateResult();
}

function toggleSign() {
  expression = expression.charAt(0) === '-' ? expression.slice(1) : '-' + expression;
  updateResult();
}

function calculate() {
  try {
    const result = eval(expression);
    expression = result.toString();
    updateResult();
  } catch (error) {
    expression = '';
    updateResult();
    alert('Invalid expression');
  }
}

function updateResult() {
  const resultInput = document.getElementById('result');
  resultInput.value = expression;
}

// Support for keyboard input
document.addEventListener('keydown', function(event) {
  const key = event.key;

  if (/^[0-9+\-*/.^()%]$/.test(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    clear();
  } else if (key === 'Escape') {
    clearAll();
  }
});
