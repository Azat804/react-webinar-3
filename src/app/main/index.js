import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageList from '../../components/page-list';
import PageItem from '../../components/page-item';

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);
  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pages: state.pages.numbers,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    renderPage: useCallback(
      idPage => {
        store.actions.pages.setSelectedPages(idPage);
        store.actions.catalog.load(idPage);
      },
      [store],
    ),
    fillPages: useCallback(amount => store.actions.pages.fill(amount), [store]),
  };
  useEffect(() => {
    callbacks.fillPages(select.count);
  }, [select.count]);

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
    page: useCallback(
      (item, amount) => {
        return (
          <PageItem
            onLoad={callbacks.renderPage}
            numPage={item.id}
            item={item}
            amount={amount}
            currentPage={item.selected}
          />
        );
      },
      [callbacks.renderPage],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <PageList list={select.pages} renderPage={renders.page} amount={select.count} />
    </PageLayout>
  );
}

export default memo(Main);
