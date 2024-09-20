import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Modal from 'react-modal';
import Head from '../head';
import Controls from '../controls';
import List from '../list';

function CustomModal({ isOpen = false, children }) {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="Modal-overlay"
      className="Modal-content"
      closeTimeoutMS={300}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
}

CustomModal.propTypes = {
  isOpen: PropTypes.bool,
};

export default CustomModal;
