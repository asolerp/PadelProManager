import firestore from '@react-native-firebase/firestore';

export const matchQuery = firestore().collection('matches');
export const playerQuery = userId =>
  userQuery.doc(userId).collection('players');
export const userQuery = firestore().collection('users');
export const sessionQuery = firestore().collection('sessions');
export const relationsQuery = firestore().collection('relations');
