import Share from 'react-native-share';
import iconBase64 from '../utils/icon.json';

export const useShareApp = () => {
  const url = 'https://padelpromanager.com/meet_padelpro';
  const title = 'Descubre Padel Pro Manager';
  const message =
    '¿Conoces Padel Pro Manager? Te permite gestionar tus jugadores, llevar un registro de sus logros y muchas cosas más!';
  const icon = iconBase64;

  const handleShare = () => {
    Share.open({
      url,
      title,
      message,
    });
  };

  return {
    handleShare,
  };
};
