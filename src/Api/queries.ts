import firestore from '@react-native-firebase/firestore';

export const matchQuery = firestore().collection('matches');
export const playerQuery = firestore().collection('players');
export const userQuery = firestore().collection('users');
