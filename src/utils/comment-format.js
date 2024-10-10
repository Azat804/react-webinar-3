import listToTree from './list-to-tree';
import treeToList from './tree-to-list';
/**
 * Форматирование массива комментариев
 * @param comments {Array} исходный массив комментариев
 * @param idComment {String} идентификатор комментируемого комментария
 * @returns {Array}
 */
export default function commentFormat(comments, idComment) {
  if (!comments) {
    return [];
  }
  let ind = -1;
  const formattedComments = comments?.map(elem => {
    if (elem.parent._type === 'article') elem.parent._id = null;
    return elem;
  });
  let res = formattedComments
    ? [
        ...treeToList(listToTree(formattedComments), (item, level) => ({
          ...item,
          value: item._id,
          padding: 40 + 30 * level,
        })),
      ]
    : [];
  res = res?.map((item, index, array) => {
    if (idComment === item._id && item.children.length === 0) {
      item.isOpen = true;
    } else if (item.children.length !== 0 && idComment === item._id) {
      ind = array.findLastIndex(elem => elem.parent._id === idComment);
    } else {
      item.isOpen = false;
    }
    return item;
  });
  if (res.length != 0 && ind != -1) {
    res[ind].isOpen = true;
  }
  return res;
}
