/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.id = this.state.list.length;
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
   * Добавление новой записи
   */
  addItem() {
    this.setNewId();
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.id, title: 'Новая запись', count: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.selected && item.code != code) {
          item.selected = false;
        }
        if (item.code === code) {
          if (!item.selected) {
            item.count++;
          }
          item.selected = !item.selected;
        }
        return item;
      }),
    });
  }

  /**
   * Установка кода для новой записи
   */
  setNewId() {
    this.id++;
  }

  /**
   * Получение информации о количестве выделений
   * @param count
   */
  getInfoSelection(count) {
    let infoSelection = ' | Выделяли ' + String(count) + ' раз';
    if (count == 0) {
      infoSelection = '';
    } else if (2 <= count % 10 && count % 10 <= 4 && !(12 <= count && count <= 14)) {
      infoSelection += 'а';
    }
    return infoSelection;
  }
}

export default Store;
