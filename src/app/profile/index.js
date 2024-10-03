import { memo, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import Authorization from '../../components/authorization';
import LoginCard from '../../components/login-card';
import ProfileCard from '../../components/profile-card';

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  // Параметры из пути /articles/:id
  const params = useParams();

  const select = useSelector(state => ({
    token: state.authorization.token,
    waiting: state.authorization.waiting,
    profileData: state.authorization.profileData,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    getToken: useCallback(
      (login, password) => {
        store.actions.authorization.getToken(login, password);
      },
      [store],
    ),
    deleteToken: useCallback(() => {
      store.actions.authorization.deleteToken();
      navigate(`/login`);
    }, [store]),
  };
  useMemo(() => {
    store.actions.authorization.getProfile(localStorage.getItem('token'));
  }, [store, select.token]);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate(`/login`);
    }
  }, [select.token]);
  return (
    <PageLayout>
      <Authorization
        userName={select.profileData ? select.profileData.name : ''}
        onDelete={callbacks.deleteToken}
        t={t}
        loginAddress={'/login'}
        profileAddress={'/profile'}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard profileData={select.profileData ? select.profileData : {}} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
