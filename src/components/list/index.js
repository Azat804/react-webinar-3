import { memo } from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, renderItem = item => {}, isComment = false }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item._id} className={isComment ? 'List-item-comment' : 'List-item'}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  renderItem: PropTypes.func,
  isComment: PropTypes.bool,
};

export default memo(List);
