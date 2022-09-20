const functions = require('firebase-functions');
const fetch = require('node-fetch');

const API_WEB_FIREBASE = 'AIzaSyC8aj5yS0qRdb75tQHs101a-mSn2xaUujI';
const DYNAMIK_LINK = 'https://padelpromanager.page.link';

const newPlayer = functions.firestore
  .document('users/{userId}/players/{playerId}')
  .onCreate(async (snap, context) => {
    const coachId = context.params.userId;

    const body = {
      dynamicLinkInfo: {
        domainUriPrefix: DYNAMIK_LINK,
        link: `https://padelpromanager.com/player_invitation?action=new_player&coach_id=${coachId}`,
        iosInfo: {
          iosAppStoreId: '1608207639',
          iosBundleId: 'com.padelpro',
        },
      },
    };

    const url = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${API_WEB_FIREBASE}`;

    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'},
    });

    const data = await response.json();

    console.log(data);
  });

module.exports = {
  newPlayer,
};
