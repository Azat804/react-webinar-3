import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function ProfileCard({ profileData = {}, t = () => {} }) {
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('profile.title')}</div>
      <div className={cn('name')}>
        {t('profile.name')}: <span className={cn('name__mark')}>{profileData.name}</span>
      </div>
      <div className={cn('phone')}>
        {t('profile.telephone')}: <span className={cn('phone__mark')}>{profileData.phone}</span>
      </div>
      <div className={cn('email')}>
        {t('profile.email')}: <span className={cn('email__mark')}>{profileData.email}</span>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  profileData: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  t: PropTypes.func,
};

export default memo(ProfileCard);
