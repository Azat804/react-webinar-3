import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ItemProduct from '../../components/item-product';

function Product() {
  const params = useParams().id;
  const store = useStore();

  useEffect(() => {
    store.actions.product.loadProduct(params);
  }, [params]);
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    productData: state.product,
  }));
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
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
