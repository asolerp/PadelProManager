import firestore from '@react-native-firebase/firestore';
import {
  ACCOUNTING,
  CONVERSATIONS,
  GROUPS,
  MATCHES,
  PLAYERS,
  RELATIONS,
  REQUESTS,
  SESSIONS,
  USERS,
} from '../Models/entities';

export const matchQuery = firestore().collection(MATCHES);
export const playerQuery = userId => userQuery.doc(userId).collection(PLAYERS);
export const userQuery = firestore().collection(USERS);
export const sessionQuery = firestore().collection(SESSIONS);
export const accountingQuery = firestore().collection(ACCOUNTING);
export const relationsQuery = firestore().collection(RELATIONS);
export const requestQuery = firestore().collection(REQUESTS);
export const conversationsQuery = firestore().collection(CONVERSATIONS);
export const groupQuery = firestore().collection(GROUPS);
