const {firestore} = require('firebase-admin');

const getStatsUpdateObject = value => {
  return {
    ['w.fd']: firestore.FieldValue.increment(value?.w?.fd || 0),
    ['w.fr']: firestore.FieldValue.increment(value?.w?.fr || 0),
    ['w.vd']: firestore.FieldValue.increment(value?.w?.vd || 0),
    ['w.vr']: firestore.FieldValue.increment(value?.w?.vr || 0),
    ['w.bd']: firestore.FieldValue.increment(value?.w?.bd || 0),
    ['w.br']: firestore.FieldValue.increment(value?.w?.br || 0),
    ['w.bj']: firestore.FieldValue.increment(value?.w?.bj || 0),
    ['w.sm']: firestore.FieldValue.increment(value?.w?.sm || 0),
    ['nf.fd']: firestore.FieldValue.increment(value?.nf?.fd || 0),
    ['nf.fr']: firestore.FieldValue.increment(value?.nf?.fr || 0),
    ['nf.vd']: firestore.FieldValue.increment(value?.nf?.vd || 0),
    ['nf.vr']: firestore.FieldValue.increment(value?.nf?.vr || 0),
    ['nf.bd']: firestore.FieldValue.increment(value?.nf?.bd || 0),
    ['nf.br']: firestore.FieldValue.increment(value?.nf?.br || 0),
    ['nf.bj']: firestore.FieldValue.increment(value?.nf?.bj || 0),
    ['nf.sm']: firestore.FieldValue.increment(value?.nf?.sm || 0),
    ['ef.fd']: firestore.FieldValue.increment(value?.ef?.fd || 0),
    ['ef.fr']: firestore.FieldValue.increment(value?.ef?.fr || 0),
    ['ef.vd']: firestore.FieldValue.increment(value?.ef?.vd || 0),
    ['ef.vr']: firestore.FieldValue.increment(value?.ef?.vr || 0),
    ['ef.bd']: firestore.FieldValue.increment(value?.ef?.bd || 0),
    ['ef.br']: firestore.FieldValue.increment(value?.ef?.br || 0),
    ['ef.bj']: firestore.FieldValue.increment(value?.ef?.bj || 0),
    ['ef.sm']: firestore.FieldValue.increment(value?.ef?.sm || 0),
  };
};

module.exports = {
  getStatsUpdateObject,
};
