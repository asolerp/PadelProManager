import {useTranslation} from 'react-i18next';
export const useTranslationWrapper = () => {
  const {t: loc} = useTranslation();
  return {loc};
};
