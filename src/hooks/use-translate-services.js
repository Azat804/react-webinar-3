import { useCallback, useContext } from 'react';
import { I18nContext } from '../i18n/context';
import useServices from './use-services';

/**
 * Хук для доступа к объекту сервиса мультиязычности
 */
export default function useTranslateServices() {
  return useServices().i18n;
}
