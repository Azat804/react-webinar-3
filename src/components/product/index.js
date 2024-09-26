import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageList from '../../components/page-list';
import PageItem from '../../components/page-item';
import ItemProduct from '../item-product';

function Product() {
  const params = useParams().id;
  console.log(params);
  const store = useStore();

  useEffect(() => {
    store.actions.product.loadProduct(params);
  }, [params]);
  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pages: state.pages.numbers,
    description: state.product.description,
    country: state.product.madeIn,
    categotry: state.product.category,
    edition: state.product.edition,
    price: state.product.price,
    productData: state.product,
  }));
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
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
    product: useCallback(
      item => {
        return <ItemProduct item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title={select.productData.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ItemProduct item={select.productData} id={params} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(Product);
