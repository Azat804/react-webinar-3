import { memo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import { cn as bem } from '@bem-react/classname';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';
function CommentForm(props) {
  const navigate = useNavigate();
  const { t } = useTranslate();
  const location = useLocation();
  const width = 954 - props.padding;
  const cn = bem('CommentForm');
  const ref = useRef();
  useEffect(() => {
    if (props.type === 'answer') {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);
  return (
    <div
      ref={ref}
      className={cn()}
      style={{
        paddingLeft: `${props.padding + 30}px`,
        paddingBottom: `${props.type == 'answer' ? 30 : props.exists ? 121 : 92}px`,
      }}
    >
      {!props.exists ? (
        <div className={cn('info')}>
          <span
            className={cn('signIn')}
            onClick={() => navigate(props.address, { state: { back: location.pathname } })}
          >
            {t('comment.signIn')}
          </span>
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
