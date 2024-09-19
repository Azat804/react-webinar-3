import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Modal from 'react-modal';
import Head from '../head';
import Controls from '../controls';
import List from '../list';

function CustomModal({
  isOpen = false,
  onCloseModal = () => {},
  title = '',
  list = [],
  onDeleteItem = () => {},
  totalCost = 0,
}) {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="Modal-overlay"
      className="Modal-content"
      closeTimeoutMS={300}
      ariaHideApp={false}
    >
      <Head title={title}>
        {' '}
        <Controls onClickModal={onCloseModal} name="Закрыть" />
      </Head>
      <div className="Modal-subtitle"></div>
      <List list={list} onClick={onDeleteItem} name="Удалить" />
      <div className="Total-info">
        <div className="Total-price">
          <div className="Total-price__text">Итого</div>
          <div className="Total-price__value">{totalCost + ' \u20bd'}</div>
        </div>
      </div>
    </Modal>
  );
}

CustomModal.propTypes = {
  isOpen: PropTypes.bool,
  onCloseModal: PropTypes.func,
  title: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
  totalCost: PropTypes.number,
};

export default CustomModal;
