import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import dateFormat from '../../utils/date-format';
import useTranslate from '../../hooks/use-translate';
import './style.css';
import CommentForm from '../comment-form';

function ItemComment(props) {
  const { lang, t } = useTranslate();
  const cn = bem('ItemComment');
  const listTemp = props.list?.find(elem => elem._id === props.idComment);
  const username = listTemp ? listTemp.author.profile.name : '';
  const padding = listTemp ? listTemp.padding : 0;
  return (
    <>
      <div style={{ paddingLeft: props.item.padding + 'px' }} className={cn()}>
        <div className={cn('title')}>
          <div className={cn('title-username')}>{props.item.author.profile.name}</div>
          <div className={cn('title-date')}>{dateFormat(props.item.dateCreate, lang)}</div>
        </div>
        <div className={cn('description')}>{props.item.text}</div>
        <span className={cn('answer')} onClick={() => props.onAnswer(props.item._id)}>
          {t('comment.reply')}
        </span>
      </div>
      {props.item.isOpen && (
        <CommentForm
          padding={padding}
          type="answer"
          title={`${t('comment.newAnswer')}`}
          placeholder={`${t('comment.newReplyPlaceholder')} ${username}`}
          onReset={props.onReset}
          info={`${t('comment.signInReply')}`}
          resetName={`${t('comment.cancel')}`}
          idComment={props.idComment}
          exists={props.exists}
          onSubmit={props.onSubmit}
          onChange={props.onChange}
          address={props.address}
        />
      )}
    </>
  );
}

ItemComment.propTypes = {
  item: PropTypes.shape({
    padding: PropTypes.number,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    _id: PropTypes.string,
    isOpen: PropTypes.bool,
  }).isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
    }),
  ).isRequired,
  onAnswer: PropTypes.func,
  onReset: PropTypes.func,
  idComment: PropTypes.string,
  exists: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  address: PropTypes.string,
};

export default memo(ItemComment);
