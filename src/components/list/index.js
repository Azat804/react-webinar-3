import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item-shop';
import './style.css';

function List({ list = [], onClick = () => {}, name = '', itemComp }) {
  const ItemComp = itemComp;
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <ItemComp item={item} onClick={onClick} name={name} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    }),
  ).isRequired,
  onClick: PropTypes.func,
  name: PropTypes.string,
};

export default React.memo(List);
