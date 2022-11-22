const {firestore} = require("firebase-admin");

const getStatsUpdateObject = value => {
  return {
    w: {
      fd:firestore.FieldValue.increment(value?.w?.fd || 0),
      fr: firestore.FieldValue.increment(value?.w?.fr || 0),
      vd:firestore.FieldValue.increment(value?.w?.vd || 0),
      vr:firestore.FieldValue.increment(value?.w?.vr || 0),
      bd:firestore.FieldValue.increment(value?.w?.bd || 0),
      br:firestore.FieldValue.increment(value?.w?.br || 0),
      bj:firestore.FieldValue.increment(value?.w?.bj || 0),
      sm:firestore.FieldValue.increment(value?.w?.sm || 0),
      x3:firestore.FieldValue.increment(value?.w?.x3 || 0),
      x4:firestore.FieldValue.increment(value?.w?.x4 || 0),
      gl:firestore.FieldValue.increment(value?.w?.gl || 0),
    },
    ef: {
      fd:firestore.FieldValue.increment(value?.ef?.fd || 0),
      fr: firestore.FieldValue.increment(value?.ef?.fr || 0),
      vd:firestore.FieldValue.increment(value?.ef?.vd || 0),
      vr:firestore.FieldValue.increment(value?.ef?.vr || 0),
      bd:firestore.FieldValue.increment(value?.ef?.bd || 0),
      br:firestore.FieldValue.increment(value?.ef?.br || 0),
      bj:firestore.FieldValue.increment(value?.ef?.bj || 0),
      sm:firestore.FieldValue.increment(value?.ef?.sm || 0),
      x3:firestore.FieldValue.increment(value?.ef?.x3 || 0),
      x4:firestore.FieldValue.increment(value?.ef?.x4 || 0),
      gl:firestore.FieldValue.increment(value?.ef?.gl || 0),
    },
    nf: {
      fd:firestore.FieldValue.increment(value?.nf?.fd || 0),
      fr: firestore.FieldValue.increment(value?.nf?.fr || 0),
      vd:firestore.FieldValue.increment(value?.nf?.vd || 0),
      vr:firestore.FieldValue.increment(value?.nf?.vr || 0),
      bd:firestore.FieldValue.increment(value?.nf?.bd || 0),
      br:firestore.FieldValue.increment(value?.nf?.br || 0),
      bj:firestore.FieldValue.increment(value?.nf?.bj || 0),
      sm:firestore.FieldValue.increment(value?.nf?.sm || 0),
      x3:firestore.FieldValue.increment(value?.nf?.x3 || 0),
      x4:firestore.FieldValue.increment(value?.nf?.x4 || 0),
      gl:firestore.FieldValue.increment(value?.nf?.gl || 0),
    }
  };
};

module.exports = {
  getStatsUpdateObject,
};
