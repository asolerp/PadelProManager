import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useContext, useEffect, useState} from 'react';
import {userQuery} from '../../../Api/queries';
import {DynamicLinkContext} from '../../../Context/DynamicLinkContext';
import {useFirebaseAuth} from '../../../Context/FirebaseContext';
import {defaultFunctions} from '../../../Lib/API/firebaseApp';
import {info} from '../../../Lib/Logging';

export const useGetPendingInvitations = ({onFinish}) => {
  const {params, setParams} = useContext(DynamicLinkContext);
  const [player, setPlayer] = useState();
  const [isVisible, setIsVisible] = useState();
  const {user} = useFirebaseAuth();
  const [loadingInvitation, setLoadingInvitation] = useState();

  const acceptInvitationFn =
    defaultFunctions.httpsCallable('handleInvitations');

  const getPlayerInfo = async () => {
    if (params?.player_id) {
      setIsVisible(true);
      const playerQuery = await userQuery.doc(params.player_id).get();
      const playerDoc = {id: playerQuery.id, ...playerQuery.data()};
      setPlayer(playerDoc);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const refetching = getPlayerInfo();
      return () => refetching;
    }, [params?.player_id]),
  );

  const handleAcceptInvitation = async () => {
    setLoadingInvitation(true);
    console.log('COACH', user?.id);
    try {
      await acceptInvitationFn({playerId: params?.player_id, coachId: user.id});
      info({
        title: 'Nuevo jugador',
        subtitle: 'Se ha vinculado a un nuevo jugador',
      });
    } catch (err) {
      console.log(err);
    } finally {
      setParams(null);
      setIsVisible(false);
      setLoadingInvitation(false);
      onFinish();
    }
  };

  const handleCancelInvitation = () => {
    setParams(null);
    setIsVisible(false);
  };

  return {
    player,
    isVisible,
    setIsVisible,
    loadingInvitation,
    handleAcceptInvitation,
    handleCancelInvitation,
  };
};
