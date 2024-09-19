import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Item({ item = {}, onClick = () => {}, name = '' }) {
  const callbacks = {
    onClick: e => {
      e.stopPropagation();
      onClick(item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-title">
        <div className="Item-code">{item.code}</div>
        <div className="Item-name">{item.title}</div>
      </div>
      <div className="Item-actions">
        <div
          className="Item-info"
          style={!item.count ? { justifyContent: 'end' } : { justifyContent: 'spaceBetween' }}
        >
          <div className="Item-price">{item.price + ' \u20bd'}</div>
          {item.count ? <div className="Item-count">{item.count + ' шт'}</div> : ''}
        </div>
        <button className="Item-button" onClick={callbacks.onClick}>
          {name}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
  name: PropTypes.string,
};

export default React.memo(Item);
