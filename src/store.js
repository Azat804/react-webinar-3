import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
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
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление нового товара в  корзину
   *  @param code
   */
  addItem(code) {
    const shopProduct = this.findItem(this.state.list, code);
    const basketProduct = this.findItem(this.state.basket, code);
    if (!basketProduct) {
      this.setState({
        ...this.state,
        basket: [
          ...this.state.basket,
          { code: code, title: shopProduct.title, price: shopProduct.price, count: 1 },
        ],
      });
    } else {
      this.setState({
        ...this.state,
        basket: this.state.basket.map(item => {
          if (item.code === code) {
            return {
              ...item,
              count: item.count + 1,
            };
          }
          return item;
        }),
      });
    }
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      basket: this.state.basket.filter(item => item.code !== code),
    });
  }

  /**
   * Выбор товара из списка
   * @param list
   * @param code
   * @returns {Object}
   */
  findItem(list, code) {
    return list.find(item => item.code === code);
  }

  /**
   * Получение общей стоимости товаров в корзине
   * @returns {Number}
   */
  getTotalCost() {
    return this.state.basket.reduce((acc, current) => acc + current.price * current.count, 0);
  }
}

export default Store;
