const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const {firebaseIDGenerator} = require('../utils/firebaseIDGenerator');
const {getPhotoIfUserExists} = require('../utils/getPhotoIfUserExists');
const { FB_REGION, SESSIONS } = require('../utils/constants');

const newSession = functions
  .region(FB_REGION)
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'The function must be called while authenticated.',
      );
    }

    const payload = data.payload;
    const {week} = payload;

    const start = moment(new Date());
    const end = moment(new Date(new Date().getFullYear(), 11, 31));

    const sessionInternalId = firebaseIDGenerator();

    let result = [];

    const {players} = payload;
    let playersWithUserImage;

    playersWithUserImage = await Promise.all(
      players.map(async player => {
        const userImg = await getPhotoIfUserExists(player.email);
        if (userImg) {
          return {...player, profileImg: userImg};
        } else {
          return player;
        }
      }),
    );

    if (week && week.length > 0) {
      const batch = admin.firestore().batch();

      week.forEach(day => {
        let current = start.clone();
        while (current.day(7 + day).isBefore(end)) {
          result.push(current.clone());
        }
      });

      result.forEach(async date => {
        const docRef = admin.firestore().collection(SESSIONS).doc();

        batch.set(docRef, {
          ...payload,
          players: playersWithUserImage,
          date: date.valueOf(),
          internalId: sessionInternalId,
        });
      });

      await batch.commit();
    } else {
      await admin
        .firestore()
        .collection(SESSIONS)
        .add({
          ...payload,
          players: playersWithUserImage,
        });
    }
  });

module.exports = {
  newSession,
};
