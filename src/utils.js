/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Получение категорий в правильном формате
 * @param categories {Array} исходный массив категорий
 * @returns {Array}
 */
export function getFormattedCategories(categories) {
  let formattedCategories = [{ value: '', title: 'Все' }];
  let categoriesTemp = calcCategories(categories, [...categories], '', []);
  for (let item of categoriesTemp) {
    formattedCategories.push({ value: item._id, title: item.title });
  }
  return formattedCategories;
}

/**
 * Составление массива категорий с учетом вложенности
 * @param arr {Array} Изменяемый массив категорий
 * @param arrCopy {Array} Исходный массив категорий
 * @param dash {String} Дефис
 * @param res {String} Массив категорий с учетом вложенности
 * @return {Array}
 */
function calcCategories(arr, arrCopy, dash, res) {
  let newArr = [];
  for (let item of arr) {
    if (!res.find(elem => item._id === elem._id)) {
      if (item.parent == null) {
        res.push(item);
      } else if (arr.length != arrCopy.length && arr.length != 0) {
        res.push({ ...item, title: `${dash}${item.title}` });
      }
      newArr = [
        ...arrCopy.filter(val => {
          let temp = val.parent;
          return val.parent !== null && item._id === temp['_id'];
        }),
      ];
      if (newArr.length === 0) {
      } else {
        calcCategories(newArr, arrCopy, (dash += '- '), res);
        dash = dash.slice(0, dash.length - 2);
      }
    }
  }

  return res;
}
