import * as translations from './translations';

 class I18nService {  
  
  /**
   * @param services {Services}
   * @param lang {String}
   * @param listeners {Object}
   */
  constructor(services) {
    this.services = services;
    this.config = {};
    this.locale = this.initState().locale;
    this.listeners = [];  
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

   /**
   * Начальное состояние 
   * @return {Object}
   */
  initState() {
      return {
        locale: 'ru',
      }
  }

  /**
   * Установка языка
   * @param newState {Object}
   */
  setLang = (locale) => { 
    for (const listener of this.listeners) listener(locale);
    this.locale = locale;
    this.services.api.setHeader('Accept-Language', locale); 
  };

  /**
 * Перевод фразу по словарю
 * @param lang {String} Код языка
 * @param text {String} Текст для перевода
 * @param [plural] {Number} Число для плюрализации
 * @returns {String} Переведенный текст
 */
  translate = (text, plural) => {
    console.log(this.lang);
    let result = (translations[this.locale] && text in translations[this.locale])
        ? translations[this.locale][text]
        : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(this.locale).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  };

}

export default I18nService;