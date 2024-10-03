import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import { useNavigate, Link } from 'react-router-dom';

function Authorization({
  userName = '',
  onDelete = () => {},
  t = () => {},
  loginAddress = '',
  profileAddress = '',
}) {
  const navigate = useNavigate();
  const callbacks = {
    onClick: e => onClick(login, password),
    onDelete: e => onDelete(),
  };
  const cn = bem('Authorization');

  return (
    <div className={cn()}>
      {userName && (
        <Link to={profileAddress} className={cn('link')}>
          {userName}
        </Link>
      )}
      {!userName ? (
        <button className={cn('button')} onClick={() => navigate(loginAddress)}>
          {t('authorization.signIn')}
        </button>
      ) : (
        <button className={cn('button')} onClick={callbacks.onDelete}>
          {t('authorization.signOut')}
        </button>
      )}
    </div>
  );
}

Authorization.propTypes = {
  userName: PropTypes.string,
  onDelete: PropTypes.func,
  t: PropTypes.func,
  loginAddress: PropTypes.string,
  profileAddress: PropTypes.string,
};

export default memo(Authorization);
