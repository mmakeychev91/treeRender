/******/ (() => { // webpackBootstrap
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
// Переменные
const drawBtn = document.querySelector('.js-draw');
const input = document.querySelector('.js-input');
const treeWrap = document.querySelector('.tree-wrap');

// Подписываемся и обрабатываем событие клика на кнопку "отрисовать"
drawBtn.addEventListener('click', () => {
  const inputValue = input.value;
  const array = parseStringToArray(inputValue);
  const html = renderArrayToHTML(array);
  treeWrap.innerHTML = html;
});

// Метод, который преобразует строку в массив 
const parseStringToArray = string => {
  string = removeSpaces(string);

  // Удаляем первую и последнюю скобку, если они есть
  if (string[0] === '(' && string[string.length - 1] === ')') {
    string = string.slice(1, -1);
  }
  const stack = [];
  let currentArray = [];
  let currentElement = ''; // Для накопления символов числа или букв

  for (let char of string) {
    if (char === '(') {
      // Начало нового вложенного массива
      if (currentElement) {
        currentArray.push(currentElement);
        currentElement = '';
      }
      stack.push(currentArray);
      currentArray = [];
    } else if (char === ')') {
      // Конец текущего вложенного массива
      if (currentElement) {
        currentArray.push(currentElement);
        currentElement = '';
      }
      const lastArray = currentArray;
      currentArray = stack.pop();
      currentArray.push(lastArray);
    } else if (char !== ' ') {
      // Накопление символов в текущий элемент (число или строка)
      currentElement += char;
    } else if (char === ' ' && currentElement) {
      // Когда встречаем пробел, добавляем текущий элемент (число или строку) в массив
      currentArray.push(currentElement);
      currentElement = '';
    }
  }

  // Добавляем последний накопленный элемент, если он есть
  if (currentElement) {
    currentArray.push(currentElement);
  }
  return currentArray;
};

// Метод удаляет пробелы
const removeSpaces = string => {
  return string.replace(/\s+/g, ' ').trim(); // Преобразуем множественные пробелы в один
};

// Метод рендерит дерево списков
const renderArrayToHTML = arr => {
  let html = '<ul>';
  arr.forEach(item => {
    if (Array.isArray(item)) {
      // Если элемент - это массив, создаем вложенный список
      html += `<li>${renderArrayToHTML(item)}</li>`;
    } else {
      // Если элемент - число или строка, добавляем отдельный элемент списка
      html += `<li>${item}</li>`;
    }
  });
  html += '</ul>';
  return html;
};
/******/ })()
;
//# sourceMappingURL=bundle.js.map