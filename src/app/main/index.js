import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import Authorization from '../../components/authorization';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  useInit(
    () => {
      store.actions.categories.loadCategories();
    },
    [],
    true,
  );

  const select = useSelector(state => ({
    token: state.authorization.token,
    profileData: state.profile.profileData,
  }));

  const callbacks = {
    // Добавление в корзину

    deleteToken: useCallback(() => {
      store.actions.authorization.deleteToken();
    }, [store]),
  };
  const { t } = useTranslate();
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
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
