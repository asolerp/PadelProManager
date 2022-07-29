const admin = require('firebase-admin');
const { USERS } = require('./constants');

const getPhotoIfUserExists = async email => {
  const user = await admin
    .firestore()
    .collection(USERS)
    .where('email', '==', email)
    .get();

  if (user.docs.length > 0) {
    return user.docs[0].data().profileImg || user.docs[0].data().photoURL;
  }

  return undefined;
};

module.exports = {
  getPhotoIfUserExists,
};
