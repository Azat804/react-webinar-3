import StoreModule from '../module';

/**
 * Категории
 */
class CategoriesState extends StoreModule {
  initState() {
    return {
      categories: [],
    };
  }

  /**
   * Загрузка категорий
   * @return {Promise<void>}
   */
  async loadCategories() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    console.log(json.result.items);
    this.setState(
      {
        ...this.getState(),
        categories: json.result.items,
      },
      `Загружены категории из АПИ`,
    );
  }
}

export default CategoriesState;
