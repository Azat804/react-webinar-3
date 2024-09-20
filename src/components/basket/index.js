import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Head from '../head';
import Controls from '../controls';
import List from '../list';
import { getFormattedPrice } from '../../utils';
import ItemBasket from '../item-basket';

function Basket({
  title = '',
  list = [],
  onCloseModal = () => {},
  onDeleteItem = () => {},
  totalCost = 0,
}) {
  return (
    <div className="Basket">
      <Head title={title}>
        {' '}
        <Controls onClickModal={onCloseModal} name="Закрыть" />
      </Head>
      <div className="Basket-subtitle"></div>
      <List list={list} onClick={onDeleteItem} name="Удалить" itemComp={ItemBasket} />
      <div className="Basket-info">
        <div className="Basket-price">
          <div className="Basket-price__text">Итого</div>
          <div className="Basket-price__value">{getFormattedPrice(totalCost)}</div>
        </div>
      </div>
    </div>
  );
}

Basket.propTypes = {
  title: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    }),
  ).isRequired,
  onCloseModal: PropTypes.func,
  onDeleteItem: PropTypes.func,
  totalCost: PropTypes.number,
};

export default Basket;
