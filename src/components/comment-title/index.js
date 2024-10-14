import { memo } from 'react';
import PropTypes from 'prop-types';
import useTranslate from '../../hooks/use-translate';
import useTranslateServices from '../../hooks/use-translate-services';
import './style.css';

function CommentTitle({ countComment = 0 }) {
  const { t } = useTranslateServices();
  return (
    <div className="CommentTitle">
      <h2 className="CommentTitle__item">{` ${t('comment.title')} (${countComment})`}</h2>
    </div>
  );
}

CommentTitle.propTypes = {
  countComment: PropTypes.number,
};

export default memo(CommentTitle);
