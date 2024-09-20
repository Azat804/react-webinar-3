import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import { useState } from 'react';
import CustomModal from './components/custom-modal';
import Basket from './components/basket';
import ItemShop from './components/item-shop';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basket = store.getState().basket;
  const totalBasketCost = store.getState().totalBasketCost;
  const countBasketProduct = store.getState().countBasketProduct;
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
          totalCount={countBasketProduct}
          totalCost={totalBasketCost}
        />
        <List list={list} onClick={callbacks.onAddItem} name="Добавить" itemComp={ItemShop} />
      </PageLayout>
      <CustomModal isOpen={modalIsOpen}>
        <Basket
          title="Корзина"
          list={basket}
          onCloseModal={callbacks.closeModal}
          onDeleteItem={callbacks.onDeleteItem}
          totalCost={totalBasketCost}
        />
      </CustomModal>
    </>
  );
}

export default App;
