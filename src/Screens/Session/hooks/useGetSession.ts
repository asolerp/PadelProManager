import firestore from '@react-native-firebase/firestore';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';

export const useGetSession = ({sessionId}) => {
  const sessionQuery = firestore().collection('sessions').doc(sessionId);
  const accountingQuery = firestore()
    .collection('accounting')
    .where('sessionId', '==', sessionId);

  const [session] = useDocumentData(sessionQuery, {
    idField: 'id',
  });

  const [accounting] = useCollectionData(accountingQuery, {
    idField: 'id',
  });

  const playersHavePaid =
    (accounting?.[0] &&
      Object.entries(accounting?.[0]?.players)
        .map(([, value]) => value)
        .filter(val => val).length) ||
    0;

  const unitiPrice =
    accounting?.[0] &&
    accounting?.[0]?.price / Object.keys(accounting?.[0]?.players).length;

  const sessionAccountingBalance = unitiPrice * playersHavePaid;

  const handleUpdatePaymentStatus = async playerId => {
    try {
      await firestore()
        .collection('accounting')
        .doc(accounting?.[0]?.id)
        .update({
          [`players.${playerId}`]: !accounting?.[0]?.players?.[playerId],
        });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    session,
    accounting,
    playersHavePaid,
    sessionAccountingBalance,
    handleUpdatePaymentStatus,
  };
};
