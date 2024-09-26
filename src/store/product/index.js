import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {};
  }

  async loadProduct(idProduct) {
    const response = await fetch(
      `/api/v1/articles/${idProduct}?fields=*,madeIn(title,code),category(title)`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        title: json.result.title,
        description: json.result.description,
        country: json.result.madeIn,
        categotry: json.result.category.title,
        edition: json.result.edition,
        price: json.result.price,
      },
      'Загружен определенный товар из АПИ',
    );
  }
}

export default Product;
