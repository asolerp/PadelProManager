const admin = require('firebase-admin');
const functions = require('firebase-functions');
const {firebaseIDGenerator} = require('./utils/firebaseIDGenerator');

const emptyStats = {
  ef: {
    fd: 0,
    fr: 0,
    vd: 0,
    vr: 0,
    bd: 0,
    br: 0,
    bj: 0,
    sm: 0,
    gl: 0,
  },
  nf: {
    fd: 0,
    fr: 0,
    vd: 0,
    vr: 0,
    bd: 0,
    br: 0,
    bj: 0,
    sm: 0,
    gl: 0,
  },
  w: {
    fd: 0,
    fr: 0,
    vd: 0,
    vr: 0,
    bd: 0,
    br: 0,
    bj: 0,
    sm: 0,
    gl: 0,
  },
  tl: 0,
  tm: 0,
  tw: 0,
};

const newUserChecker = functions.auth.user().onCreate(async user => {
  const findPlayer = await admin
    .firestore()
    .collection('players')
    .where('email', '==', user?.email)
    .get();

  if (findPlayer.docs.length > 0) {
    const player = findPlayer.docs[0];
    console.log('UID', user?.uid);
    console.log('PLAYER', player);
    await admin
      .firestore()
      .collection('players')
      .doc(player?.id)
      .update({id: user?.uid});
  } else {
    const id = firebaseIDGenerator();
    await admin.firestore().collection('players').doc(id).set({
      email: user?.email,
    });
    await admin
      .firestore()
      .collection('players')
      .doc(id)
      .collection('stats')
      .doc('global')
      .set(emptyStats);
  }
});

module.exports = {
  newUserChecker,
};
