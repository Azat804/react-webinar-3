import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import { useState } from 'react';
import CustomModal from './components/custom-modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basket = store.getState().basket;
  const totalCost = store.getTotalCost();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      code => {
        store.addItem(code);
      },
      [store],
    ),
    openModal: () => {
      setModalIsOpen(true);
    },
    closeModal: () => {
      setModalIsOpen(false);
    },
  };
  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls
          onClickModal={callbacks.openModal}
          name="Перейти"
          totalCount={basket.length}
          totalCost={totalCost}
        />
        <List list={list} onClick={callbacks.onAddItem} name="Добавить" />
      </PageLayout>
      <CustomModal
        isOpen={modalIsOpen}
        onCloseModal={callbacks.closeModal}
        title="Корзина"
        list={basket}
        onDeleteItem={callbacks.onDeleteItem}
        totalCost={totalCost}
      ></CustomModal>
    </>
  );
}

export default App;
