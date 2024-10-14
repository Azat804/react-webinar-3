import { useCallback, useState, useEffect } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */

export default function useTranslate() {

  const i18nService = useServices().i18n;

  const [lang, setLang] = useState(i18nService.locale);

  useEffect(() => {

    const listener = i18nService.subscribe((lang)=>{
       setLang(lang);
    }); 

    return () => {
      listener();
    };


  }, [i18nService, lang]);

  const i18n = {
    t:useCallback(
      (text, plural) => {
        return i18nService.translate(text, plural);
      },
      [i18nService, lang],
    ),
    lang,
    setLang:i18nService.setLang
  }

  return i18n;
}