import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function ItemProduct({ item = {}, id = '', onAdd = () => {} }) {
  const cn = bem('ItemProduct');

  const callbacks = {
    onAdd: e => onAdd(id),
  };
  const data = { ...item };
  const countryData = { ...data.country };
  return (
    <div className={cn()}>
      <div className={cn('description')}>{data.description}</div>
      <div className={cn('country')}>
        Страна производитель:{' '}
        <span className={cn('country__bold')}>{`${countryData.title} (${countryData.code})`} </span>
      </div>
      <div className={cn('category')}>
        Категория: <span className={cn('category__bold')}>{data.categotry}</span>
      </div>
      <div className={cn('edition')}>
        Год выпуска: <span className={cn('edition__bold')}>{data.edition}</span>
      </div>
      <div className={cn('price')}>Цена: {numberFormat(data.price)} ₽</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

ItemProduct.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    categotry: PropTypes.string,
    edition: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    country: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
  }).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onAdd: PropTypes.func,
};

export default memo(ItemProduct);
