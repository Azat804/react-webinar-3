import StoreModule from '../module';

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      categories: [],
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        selectedCategory: '',
      },
      count: 0,
      waiting: false,
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    if (urlParams.has('limit'))
      validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('query')) validParams.query = urlParams.get('query');
    if (urlParams.has('selectedCategory'))
      validParams.selectedCategory = urlParams.get('selectedCategory') || '';
    await this.setParams({ ...this.initState().params, ...validParams, ...newParams }, true);
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = { ...this.initState().params, ...newParams };
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const params = { ...this.getState().params, ...newParams };

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params,
        waiting: true,
      },
      'Установлены параметры каталога',
    );

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();
    const url = window.location.pathname + '?' + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }

    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      sort: params.sort,
      'search[query]': params.query,
    };

    if (params.selectedCategory) {
      apiParams['search[category]'] = params.selectedCategory;
    }
    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        waiting: false,
      },
      'Загружен список товаров из АПИ',
    );
  }

  /**
   * Загрузка категорий
   * @return {Promise<void>}
   */
  async loadCategories() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    let categories = [{ value: '', title: 'Все' }];
    let categoriesTemp = this.getCategories(json.result.items, [...json.result.items], '', []);
    for (let item of categoriesTemp) {
      categories.push({ value: item._id, title: item.title });
    }
    this.setState(
      {
        ...this.getState(),
        categories: categories,
      },
      `Загружены категории из АПИ`,
    );
  }

  /**
   * Получение категорий в правильном формате
   * @param arr {Array} Изменяемый массив категорий
   * @param arrCopy {Array} Исходный массив категорий
   * @param dash {String} Дефис
   * @param res {String} Массив категорий в правильном формате
   * @return {Array}
   */
  getCategories(arr, arrCopy, dash, res) {
    let newArr = [];
    for (let item of arr) {
      if (!res.find(elem => item._id === elem._id)) {
        if (item.parent == null) {
          res.push(item);
        } else {
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
          this.getCategories(newArr, arrCopy, (dash += '- '), res);
          dash = dash.slice(0, dash.length - 2);
        }
      }
    }

    return res;
  }
}

export default CatalogState;
