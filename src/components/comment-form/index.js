import { memo } from 'react';
import { Link } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import { cn as bem } from '@bem-react/classname';
import './style.css';
function CommentForm(props) {
  const { t } = useTranslate();
  const width = 984 - props.padding;
  const cn = bem('CommentForm');
  return (
    <div
      className={cn()}
      style={{
        paddingLeft: `${props.padding}px`,
        paddingBottom: `${props.type == 'answer' ? 30 : props.exists ? 121 : 92}px`,
      }}
    >
      {!props.exists ? (
        <div className={cn('info')}>
          <Link to={props.address}>{t('comment.signIn')}</Link>
          {`, ${props.info}`}{' '}
          <span className={cn('reset')} onClick={props.onReset}>
            {props.resetName}
          </span>
        </div>
      ) : (
        <div>
          <form onSubmit={props.onSubmit}>
            <h2 className={cn('title')}>{props.title}</h2>

            <div className={cn('input-container')}>
              <input
                onChange={props.onChange}
                placeholder={props.placeholder}
                className={cn('input')}
                style={{ width: `${width}px` }}
              />
            </div>
            <div className={cn('actions')}>
              <button type="submit">{t('comment.send')}</button>
              {props.type == 'answer' && (
                <button onClick={props.onReset}>{t('comment.cancel')}</button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default memo(CommentForm);
