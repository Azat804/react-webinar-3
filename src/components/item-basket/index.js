import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import { getFormattedPrice } from '../../utils';
import './style.css';

function ItemBasket({ item = {}, onClick = () => {}, name = '' }) {
  const callbacks = {
    onClick: e => {
      e.stopPropagation();
      onClick(item.code);
    },
  };
  return (
    <div className="Item-basket">
      <div className="Item-basket-title">
        <div className="Item-basket-code">{item.code}</div>
        <div className="Item-basket-name">{item.title}</div>
      </div>
      <div className="Item-basket-actions">
        <div className="Item-basket-info">
          <div className="Item-basket-price">{`${getFormattedPrice(item.price)}`}</div>
          <div className="Item-basket-count">{item.count + ' шт'}</div>
        </div>
        <button className="Item-basket-button" onClick={callbacks.onClick}>
          {name}
        </button>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
  name: PropTypes.string,
};

export default React.memo(ItemBasket);
