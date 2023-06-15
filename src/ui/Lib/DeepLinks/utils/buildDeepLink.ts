import dynamicLinks from '@react-native-firebase/dynamic-links';

const DYNAMIK_LINK = 'https://padelpromanager.page.link';

const generateLink = (action, params) => {
  if (action === 'ask_coach') {
    return `https://padelpromanager.com/player_invitation?action=ask_coach&player_id=${params.playerId}`;
  }
  return;
};

export const buildLink = async (action, params) => {
  const link = await dynamicLinks().buildLink({
    link: generateLink(action, params),
    // domainUriPrefix is created in your Firebase console
    domainUriPrefix: DYNAMIK_LINK,
    // optional setup which updates Firebase analytics campaign
    // "banner". This also needs setting up before hand
    ios: {
      appStoreId: '1608207639',
      bundleId: 'com.padelpro',
    },
  });

  return link;
};
