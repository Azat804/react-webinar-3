import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import { getFormattedPrice } from '../../utils';
import './style.css';

function ItemShop({ item = {}, onClick = () => {}, name = '' }) {
  const callbacks = {
    onClick: e => {
      e.stopPropagation();
      onClick(item.code);
    },
  };
  return (
    <div className="Item-shop">
      <div className="Item-shop-title">
        <div className="Item-shop-code">{item.code}</div>
        <div className="Item-shop-name">{item.title}</div>
      </div>
      <div className="Item-shop-actions">
        <div className="Item-shop-info">
          <div className="Item-shop-price">{`${getFormattedPrice(item.price)}`}</div>
        </div>
        <button className="Item-shop-button" onClick={callbacks.onClick}>
          {name}
        </button>
      </div>
    </div>
  );
}

ItemShop.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
  name: PropTypes.string,
};

export default React.memo(ItemShop);
