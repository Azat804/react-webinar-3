import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function PageItem(props) {
  const cn = bem('PageItem');

  const callbacks = {
    onLoad: e => {
      props.onLoad(props.numPage);
    },
  };
  const className = cn('button') + (props.currentPage ? '_selected' : '');
  return (
    <div className={cn()}>
      <button onClick={callbacks.onLoad} className={className}>
        {props.numPage}
      </button>
    </div>
  );
}

PageItem.propTypes = {
  numPage: PropTypes.number,
  currentPage: PropTypes.bool,
  onLoad: PropTypes.func,
};

export default memo(PageItem);
