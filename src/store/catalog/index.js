import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      count: 0,
    };
  }

  async load(id = 1) {
    if (id == 0) {
      const response = await fetch(
        '/api/v1/articles?limit=10&skip=20&fields=items(_id,%20title,%20price),count',
      );
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          count: json.result.count,
        },
        'Загружены товары из АПИ',
      );
    } else {
      const response = await fetch(
        `/api/v1/articles?limit=10&skip=${10 * (id - 1)}&fields=items(_id,%20title,%20price),count`,
      );
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          count: json.result.count,
        },
        `Загружены товары из АПИ${id}`,
      );
    }
  }

  async loadProduct(idProduct) {
    const response = await fetch(
      `/api/v1/articles/${idProduct}?fields=*,madeIn(title,code),category(title)`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        description: json.result.description,
        country: json.result.madeIn,
        categotry: json.result.category.title,
        edition: json.result.edition,
        price: json.result.price,
      },
      'Загружен определенный товар из АПИ ',
    );
  }
}

export default Catalog;
