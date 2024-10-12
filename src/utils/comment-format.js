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
          padding: 40 + 30 * level > 770 ? 770 : 40 + 30 * level,
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

  const indexOfIdComment = res?.findIndex(item => item._id === idComment);
  const indexOfPrevTarget = res?.findIndex(
    (item, index) => index > indexOfIdComment && item.padding <= res[indexOfIdComment]?.padding,
  );
  const targetIndex = indexOfPrevTarget === -1 ? res.length - 1 : indexOfPrevTarget - 1;
  if (res.length != 0 && ind != -1) {
    res[targetIndex].isOpen = true;
  }

  return res;
}

/**
 * Добавление нового комментария
 * @param comments {Array} исходный массив комментариев
 * @param newComment {Object} новый комментарий
 * @param username {String} имя авторизованного пользователя
 * @returns {Array}
 */
export function addComment(comments, newComment, username) {
  if (!username || !newComment._id) {
    return comments;
  }
  let res = [...comments];
  let newCommentFormatted = {
    author: { profile: { name: username } },
    dateCreate: newComment.dateCreate,
    parent: newComment.parent,
    text: newComment.text,
    _id: newComment._id,
  };
  if (newCommentFormatted.parent._type == 'article') {
    newCommentFormatted = { ...newCommentFormatted, children: [] };
    res.push(newCommentFormatted);
  } else {
    newCommentFormatted = { ...newCommentFormatted, children: [1] };
    res.push(newCommentFormatted);
  }
  return res;
}
