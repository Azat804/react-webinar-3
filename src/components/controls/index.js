import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';

function Controls({ onClickModal = () => {}, name = '', totalCount = -1, totalCost = 0 }) {
  return (
    <div className="Controls">
      {totalCount == -1 ? (
        ''
      ) : (
        <div className="Controls-info">
          В корзине:{' '}
          <span className="Controls-info__mark">
            {totalCount === 0
              ? 'пусто'
              : `${totalCount} ${plural(totalCount, {
                  one: 'товар',
                  few: 'товара',
                  many: 'товаров',
                })} / ${totalCost} \u20bd`}
          </span>
        </div>
      )}

      <button className="Controls-button" onClick={() => onClickModal()}>
        {name}
      </button>
    </div>
  );
}

Controls.propTypes = {
  onClickModal: PropTypes.func,
  name: PropTypes.string,
  totalCount: PropTypes.number,
  totalCost: PropTypes.number,
};

export default React.memo(Controls);
