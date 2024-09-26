import StoreModule from '../module';

class Pages extends StoreModule {
  initState() {
    return {
      numbers: [],
    };
  }

  fill(amount) {
    let newFormattedObj = [];
    let obj = { numbers: [] };
    let originalObj = { numbers: [] };
    for (let i = 1; i < amount + 1; i++) {
      if (i == 1) {
        obj.numbers.push({ id: i, selected: true });
        originalObj.numbers.push({ id: i, selected: true });
      } else if (i == 2 || i == 3) {
        obj.numbers.push({ id: i, selected: false });
        originalObj.numbers.push({ id: i, selected: false });
      } else if (i == amount) {
        obj.numbers.push({ id: i, selected: false });
        originalObj.numbers.push({ id: i, selected: false });
      } else {
        originalObj.numbers.push({ id: i, selected: false });
      }
    }
    for (let i = 0; i < obj.numbers.length - 1; i++) {
      newFormattedObj.push(obj.numbers[i]);
      if (-obj.numbers[i].id + obj.numbers[i + 1].id > 1) {
        newFormattedObj.push({ id: 0, selected: false });
      }
    }
    let lastNumber = obj.numbers[obj.numbers.length - 1];
    newFormattedObj.push({ ...lastNumber });
    this.originalPages = originalObj.numbers;
    this.setState({ numbers: newFormattedObj }, `Заполнение номеров страниц`);
  }

  setSelectedPages(idSelectedPage) {
    let obj = this.originalPages.map(item => {
      if (item.id == idSelectedPage) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });
    let lengthOriginalObj = this.originalPages.length;
    let newObj = obj.filter(
      item =>
        (item.id <= 3 && idSelectedPage <= 3) ||
        item.id == 1 ||
        item.id == lengthOriginalObj ||
        Math.abs(item.id - idSelectedPage) <= 1,
    );
    let newFormattedObj = [];
    for (let i = 0; i < newObj.length - 1; i++) {
      newFormattedObj.push(newObj[i]);
      if (-newObj[i].id + newObj[i + 1].id > 1) {
        newFormattedObj.push({ id: 0, selected: false });
      }
    }
    let newNumber = newObj[newObj.length - 1];
    newFormattedObj.push({ ...newNumber });
    this.setState({ ...this.getState(), numbers: newFormattedObj }, `Обновление страниц`);
  }
}

export default Pages;
