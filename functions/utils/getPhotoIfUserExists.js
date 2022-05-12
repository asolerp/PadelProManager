const admin = require('firebase-admin');

const getPhotoIfUserExists = async email => {
  const user = await admin
    .firestore()
    .collection('users')
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
