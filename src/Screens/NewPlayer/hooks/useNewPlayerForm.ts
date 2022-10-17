import {useContext, useEffect, useRef, useState} from 'react';
import {playerQuery} from '../../../Api/queries';

import {useAddDocument} from '../../../Hooks/useAddDocument';
import {popScreen} from '../../../Router/utils/actions';

import {useUploadCloudinaryImage} from '../../../Hooks/useUploadCloudinaryImage';
import {firebaseIDGenerator} from '../../../Utils/firebaseIDGenerator';

import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {LoadingModalContext} from '../../../Context/LoadingModalContext';

import {timeout} from '../../../Utils/timeout';
import {useCameraOrLibrary} from '../../../Hooks/useCamerOrLibrary';
import {error, info} from '../../../Lib/Logging';

import {useFirebaseAuth} from '../../../Context/FirebaseContext';
import {defaultFunctions} from '../../../Lib/API/firebaseApp';

export const useNewPlayerForm = (playerId, edit, reset) => {
  const {user} = useFirebaseAuth();

  const newPlayerFormRef = useRef();
  const [playerPosition, setPlayerPosition] = useState();
  const [initPlayerImg, setInitPlayerImg] = useState();
  const [loading, setLoading] = useState();
  const {uploadCloudinary} = useUploadCloudinaryImage();
  const {response, onImagePress} = useCameraOrLibrary();

  const newPlayerFn = defaultFunctions.httpsCallable('newPlayer');

  const {updateDocument} = useUpdateDocument(playerQuery(user?.id));
  const {setIsVisible, setText} = useContext(LoadingModalContext);

  const handleUpdatePlayer = async values => {
    setText('Editando jugador...');
    setIsVisible(true);
    await timeout(1500);
    try {
      if (response?.assets?.length > 0) {
        await uploadCloudinary(
          response?.assets?.[0],
          `PadelPro/users/${playerId}/avatar`,
          async url =>
            await updateDocument(playerId, {
              ...values,
              profileImg: url,
            }),
        );
      } else {
        await updateDocument(playerId, {...values});
      }
      setIsVisible(false);
      popScreen();
      info({
        title: 'Actualización',
        subtitle: 'Se ha actualizado correctamente al jugador.',
      });
    } catch (err) {
      error({
        title: 'Ha ocurrido un error',
        subtitle: 'No se ha podido actualizar el jugador',
        data: {
          error: err,
        },
      });
    }
  };

  const handleCreateNewPlayer = async values => {
    setIsVisible(true);
    setLoading(true), setText('Creando nuevo jugador...');
    const id = firebaseIDGenerator();
    try {
      if (response?.assets?.length > 0) {
        await uploadCloudinary(
          response?.assets?.[0],
          `PadelPro/users/${id}/avatar`,
          async url => {
            await newPlayerFn({
              playerId: id,
              coachId: user?.id,
              player: {
                ...values,
                profileImg: url,
              },
            });
          },
        );
      } else {
        await newPlayerFn({
          playerId: id,
          coachId: user?.id,
          player: values,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setIsVisible(false);
      popScreen();
    }
  };

  const handleSubmitForm = values => {
    edit ? handleUpdatePlayer(values) : handleCreateNewPlayer(values);
  };

  useEffect(() => {
    const getPlayerInfo = async () => {
      const playerRef = await playerQuery(user?.id).doc(playerId).get();
      const player = playerRef.data();
      reset(player);
      setInitPlayerImg(player?.profileImg);
    };
    if (playerId) {
      getPlayerInfo();
    }
  }, [playerId]);

  return {
    handleCreateNewPlayer,
    handleUpdatePlayer,
    setPlayerPosition,
    handleSubmitForm,
    newPlayerFormRef,
    playerPosition,
    initPlayerImg,
    onImagePress,
    response,
    loading,
  };
};
