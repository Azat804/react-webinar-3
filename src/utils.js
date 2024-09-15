const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Увеличение значения на 1
 * @param value {Number} Увеличиваемое значение
 */
export function getIncreasedValue(value) {
  return ++value;
}

/**
   * Получение информации о количестве выделений
   * @param count {Number} Количество выделений
   */
export function getInfoSelection(count) {
  let infoSelection = ' | Выделяли ' + String(count) + ' раз';
  if (count == 0) {
    infoSelection = '';
  } else if (2 <= count % 10 && count % 10 <= 4 && !(12 <= count && count <= 14)) {
    infoSelection += 'а';
  }
  return infoSelection;
}
