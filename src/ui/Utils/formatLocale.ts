import {enUS, es} from 'date-fns/locale';
import {getLocales} from 'react-native-localize';

export const getFormatLocale = () => {
  const locale = getLocales()[0];

  const {languageCode} = locale;

  if (languageCode === 'es') {
    return es;
  }
  if (languageCode === 'en') {
    return enUS;
  }
  return enUS;
};
