import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import { memo } from 'react';
import './style.css';
function MainMenu() {
  const cn = bem('MainMenu');
  return (
    <div className={cn()}>
      <Link to="/" className={cn('link')}>
        Главная
      </Link>
    </div>
  );
}

export default memo(MainMenu);
