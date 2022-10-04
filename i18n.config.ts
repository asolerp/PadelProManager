import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// import {languageDetectorPlugin} from './src/Translations/utils/languageDetectorPlugin';
import {en, es} from './src/Translations';

//empty for now
const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

i18n
  .use(initReactI18next)
  // .use(languageDetectorPlugin)
  .init({
    compatibilityJSON: 'v3',
    resources,
    //language to use if translations in user language are not available
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    react: {
      useSuspense: false, //in case you have any suspense related errors
    },
  });

export default i18n;
