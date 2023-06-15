import Share from 'react-native-share';
import {LINK_TO_ASK_COACH} from '../../../Context/DynamicLinkContext';
import {useFirebaseAuth} from '../../../Context/FirebaseContext';
import {buildLink} from '../../../Lib/DeepLinks/utils/buildDeepLink';
import iconBase64 from '../utils/icon.json';

export const useShareApp = () => {
  const {user} = useFirebaseAuth();

  const title = 'Descubre Padel Pro Manager';
  const message = `${user.firstName} ${user.secondName} quiere que seas su entrenad@r en Padle Pro Manager!`;
  const icon = iconBase64;

  const handleShare = async () => {
    const url = await buildLink(LINK_TO_ASK_COACH, {playerId: user.id});
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
