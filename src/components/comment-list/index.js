import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CommentList({ list, renderItem = item => {} }) {
  return (
    <div className="CommentList">
      {list.map((item, index) => (
        <div key={index} className="CommentList-item">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

CommentList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  renderItem: PropTypes.func,
};

export default memo(CommentList);
