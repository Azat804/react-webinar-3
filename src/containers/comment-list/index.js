import { memo, useMemo, useState, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import { useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import ItemComment from '../../components/item-comment';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import Spinner from '../../components/spinner';
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import commentActions from '../../store-redux/comment/actions';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import commentFormat from '../../utils/comment-format';
import CommentForm from '../../components/comment-form';
import myUseSelector from '../../hooks/use-selector';
import CommentTitle from '../../components/comment-title';

function CommentList() {
  const store = useStore();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  const [idComment, setIdComment] = useState('');
  const [data, setData] = useState({
    text: '',
    parent: {},
  });

  const mySelect = myUseSelector(state => ({
    exists: state.session.exists,
  }));
  const select = useSelector(
    state => ({
      comment: state.comment.data,
      waiting: state.comment.waiting,
      newComment: state.comment.sentComment,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект
  useInit(() => {
    dispatch(commentActions.load(params.id));
  }, [params.id, select.newComment]);
  const callbacks = {
    onAnswer: useCallback(idComment => setIdComment(idComment), [store]),
    onReset: useCallback(() => setIdComment(''), [store]),
    onChange: useCallback(
      e => {
        idComment
          ? setData(prevData => ({
              ...prevData,
              text: e.target.value,
              parent: { _id: idComment, _type: 'comment' },
            }))
          : setData(prevData => ({
              ...prevData,
              text: e.target.value,
              parent: { _id: params.id, _type: 'article' },
            }));
      },
      [store, idComment],
    ),
    onSubmit: useCallback(
      e => {
        e.preventDefault();
        dispatch(commentActions.sendComment(data));
      },
      [store, idComment, data],
    ),
  };

  const { t } = useTranslate();

  const renders = {
    item: useCallback(
      item => (
        <ItemComment
          item={item}
          onAnswer={callbacks.onAnswer}
          idComment={idComment}
          onReset={callbacks.onReset}
          list={select.comment ? comments : []}
          exists={mySelect.exists}
          onChange={callbacks.onChange}
          onSubmit={callbacks.onSubmit}
          address="/login"
        />
      ),
      [idComment, data, mySelect.exists, t],
    ),
  };
  const comments = useMemo(() => {
    return commentFormat(select.comment.items, idComment);
  }, [select.comment.items, idComment]);
  return (
    <Spinner active={select.waiting}>
      <CommentTitle countComment={comments.length} />
      <List list={comments} renderItem={renders.item} isComment={true} />
      {!idComment ? (
        <CommentForm
          padding={40}
          type="add"
          title={t('comment.newComment')}
          placeholder={t('comment.newCommentPlaceholder')}
          onReset={() => {}}
          info={t('comment.signInComment')}
          resetName=""
          idComment=""
          exists={mySelect.exists}
          onSubmit={callbacks.onSubmit}
          onChange={callbacks.onChange}
          address="/login"
        />
      ) : (
        <div style={{ paddingBottom: mySelect.exists ? '87px' : '62px' }}></div>
      )}
    </Spinner>
  );
}

export default memo(CommentList);
