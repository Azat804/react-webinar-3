import { memo } from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import uuid from 'react-uuid';
import './style.css';

function PageList({ list = [], renderPage = () => {}, amount = 0 }) {
  return (
    <div className="PageList">
      {list.map(item => {
        if (item.id !== 0) {
          return (
            <div key={uuid()} className="PageList-item">
              {renderPage(item, amount)}
            </div>
          );
        } else {
          return (
            <div key={uuid()}>
              <span className="PageList-points"> ... </span>
            </div>
          );
        }
      })}
    </div>
  );
}

PageList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }),
  ).isRequired,
  renderPage: PropTypes.func,
  amount: PropTypes.number,
};
export default memo(PageList);
