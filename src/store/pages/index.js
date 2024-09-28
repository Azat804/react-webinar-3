import StoreModule from '../module';

class Pages extends StoreModule {
  initState() {
    return {};
  }

  setSelectedPages(amount, idCurrentPage) {
    let newFormattedObj = [];
    if (amount > 9) {
      newFormattedObj.push({ id: 1, selected: false });
      newFormattedObj.push({ id: 2, selected: false });
      newFormattedObj.push({ id: 3, selected: false });
      switch (idCurrentPage) {
        case 1:
          newFormattedObj[0].selected = true;
          newFormattedObj.push({ id: 0, selected: false });
          newFormattedObj.push({ id: amount, selected: false });
          break;
        case 2:
          newFormattedObj[1].selected = true;
          newFormattedObj.push({ id: 0, selected: false });
          newFormattedObj.push({ id: amount, selected: false });
          break;
        case 3:
          newFormattedObj[2].selected = true;
          newFormattedObj.push({ id: idCurrentPage + 1, selected: false });
          newFormattedObj.push({ id: 0, selected: false });
          newFormattedObj.push({ id: amount, selected: false });
          break;
        case 4:
          newFormattedObj.push({ id: idCurrentPage, selected: true });
          newFormattedObj.push({ id: idCurrentPage + 1, selected: false });
          newFormattedObj.push({ id: 0, selected: false });
          newFormattedObj.push({ id: amount, selected: false });
          break;
        case 5:
          newFormattedObj.push({ id: idCurrentPage - 1, selected: false });
          newFormattedObj.push({ id: idCurrentPage, selected: true });
          newFormattedObj.push({ id: idCurrentPage + 1, selected: false });
          newFormattedObj.push({ id: 0, selected: false });
          newFormattedObj.push({ id: amount, selected: false });
          break;
        case amount - 2:
          newFormattedObj.push({ id: 0, selected: false });
          newFormattedObj.push({ id: idCurrentPage - 1, selected: false });
          newFormattedObj.push({ id: idCurrentPage, selected: true });
          newFormattedObj.push({ id: idCurrentPage + 1, selected: false });
          newFormattedObj.push({ id: amount, selected: false });
          break;
        case amount - 1:
          newFormattedObj.push({ id: 0, selected: false });
          newFormattedObj.push({ id: idCurrentPage - 1, selected: false });
          newFormattedObj.push({ id: idCurrentPage, selected: true });
          newFormattedObj.push({ id: amount, selected: false });
          break;
        case amount:
          newFormattedObj.push({ id: 0, selected: false });
          newFormattedObj.push({ id: idCurrentPage - 1, selected: false });
          newFormattedObj.push({ id: idCurrentPage, selected: true });
          break;
        default:
          newFormattedObj.push({ id: 0, selected: false });
          newFormattedObj.push({ id: idCurrentPage - 1, selected: false });
          newFormattedObj.push({ id: idCurrentPage, selected: true });
          newFormattedObj.push({ id: idCurrentPage + 1, selected: false });
          newFormattedObj.push({ id: 0, selected: false });
          newFormattedObj.push({ id: amount, selected: false });
          break;
      }
    } else {
      if (idCurrentPage === 1) {
        newFormattedObj.push({ id: 1, selected: true });
      } else {
        newFormattedObj.push({ id: 1, selected: false });
      }
      for (let i = 2; i < amount + 1; i++) {
        if (i === idCurrentPage) {
          newFormattedObj.push({ id: i, selected: true });
        } else {
          newFormattedObj.push({ id: i, selected: false });
        }
      }
    }
    return newFormattedObj;
  }
}

export default Pages;
