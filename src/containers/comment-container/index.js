import { memo, useMemo, useState, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import { useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import ItemComment from '../../components/item-comment';
import Spinner from '../../components/spinner';
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import commentActions from '../../store-redux/comment/actions';
import commentFormat from '../../utils/comment-format';
import CommentForm from '../../components/comment-form';
import myUseSelector from '../../hooks/use-selector';
import CommentTitle from '../../components/comment-title';
import { addComment } from '../../utils/comment-format';
import CommentList from '../../components/comment-list';
import useTranslateServices from '../../hooks/use-translate-services';

function CommentContainer() {
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
    user: state.session.user,
  }));
  const select = useSelector(
    state => ({
      comment: state.comment.data,
      waiting: state.comment.waiting,
      newComment: state.comment.sentComment,
      commentsCache: state.comment.commentsCache,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект
  useInit(() => {
    dispatch(commentActions.load(params.id));
  }, [params.id]);

  const callbacks = {
    onAnswer: useCallback(
      idComment => {
        dispatch(commentActions.deleteComment());
        setIdComment(idComment);
      },
      [store],
    ),
    onReset: useCallback(() => {
      dispatch(commentActions.deleteComment());
      setIdComment('');
    }, [store]),
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

  const { t } = useTranslateServices();
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
          username={mySelect.user.profile ? mySelect.user.profile.name : ''}
        />
      ),
      [idComment, data, mySelect.exists, t],
    ),
  };
  const comments = useMemo(() => {
    let loadedComments = select.commentsCache?.length
      ? select.commentsCache
      : select.comment
        ? select.comment.items
        : [];

    let addedComments = addComment(
      loadedComments,
      select.newComment,
      mySelect.user.profile ? mySelect.user.profile.name : '',
    );
    dispatch(commentActions.addComment(addedComments));
    return commentFormat(addedComments, idComment);
  }, [select.comment.items, idComment, select.newComment]);
  //console.log(comments);
  return (
    <Spinner active={select.waiting}>
      <CommentTitle countComment={comments.length} />
      <CommentList list={comments} renderItem={renders.item} isComment={true} />
      {!idComment ? (
        <CommentForm
          padding={10}
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

export default memo(CommentContainer);
