import {useContext, useEffect, useRef, useState} from 'react';
import {playerQuery} from '../../../Api/queries';

import {useAddDocument} from '../../../Hooks/useAddDocument';
import {popScreen} from '../../../Router/utils/actions';

import {useUploadCloudinaryImage} from '../../../Hooks/useUploadCloudinaryImage';
import {firebaseIDGenerator} from '../../../Utils/firebaseIDGenerator';
import {emptyStats} from '../utils/emptyStats';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {LoadingModalContext} from '../../../Context/LoadingModalContext';
import {AuthContext} from '../../../Context/AuthContex';
import {timeout} from '../../../Utils/timeout';
import {useCameraOrLibrary} from '../../../Hooks/useCamerOrLibrary';
import {error, info} from '../../../Lib/Logging';

export const useNewPlayerForm = (playerId, edit, reset) => {
  const {user} = useContext(AuthContext);

  const newPlayerFormRef = useRef();
  const [playerPosition, setPlayerPosition] = useState();
  const [initPlayerImg, setInitPlayerImg] = useState();

  const {uploadCloudinary} = useUploadCloudinaryImage();
  const {response, onImagePress} = useCameraOrLibrary();
  const {addDocument, loading: loadingAddDocument} = useAddDocument(
    playerQuery(user?.id),
  );

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
    setText('Creando nuevo jugador...');
    const id = firebaseIDGenerator();
    try {
      if (response?.assets?.length > 0) {
        await uploadCloudinary(
          response?.assets?.[0],
          `PadelPro/users/${id}/avatar`,
          async url =>
            await addDocument({
              docId: id,
              data: {
                ...Object.fromEntries(
                  Object.entries(values).filter(([key, value]) => !!value),
                ),
                profileImg: url,
              },
              callback: async () =>
                await playerQuery(user?.id)
                  .doc(id)
                  .collection('stats')
                  .doc('global')
                  .set(emptyStats),
            }),
        );
      } else {
        console.log('CREANDO JUEGO');
        await addDocument({
          docId: id,
          data: {
            ...Object.fromEntries(
              Object.entries(values).filter(([key, value]) => !!value),
            ),
          },
          callback: async () =>
            await playerQuery(user?.id)
              .doc(id)
              .collection('stats')
              .doc('global')
              .set(emptyStats),
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
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
    loading: loadingAddDocument,
  };
};
