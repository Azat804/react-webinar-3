import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { useState } from 'react';
import './style.css';

function LoginCard({ onClick = () => {}, errorData = '', t = () => {} }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const callbacks = {
    onClick: e => onClick(login, password),
  };
  const cn = bem('LoginCard');
  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('login.title')}</div>

      <div className={cn('login')}>{t('login.login')}</div>
      <input
        className={cn('input-login')}
        onChange={e => {
          setLogin(e.target.value);
        }}
      />
      <div className={cn('password')}>{t('login.password')}</div>
      <input
        type="password"
        className={cn('input-password')}
        onChange={e => {
          setPassword(e.target.value);
        }}
      />
      {errorData && <div className={cn('error')}>{errorData}</div>}

      <button onClick={callbacks.onClick}>{t('login.signIn')}</button>
    </div>
  );
}

LoginCard.propTypes = {
  onClick: PropTypes.func,
  errorData: PropTypes.string,
  t: PropTypes.func,
};

export default memo(LoginCard);
