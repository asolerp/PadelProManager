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

export const useNewPlayerForm = playerId => {
  const {user} = useContext(AuthContext);
  const init = {
    firstName: '',
    secondName: '',
    gender: '',
    birthDate: '',
    hand: '',
    category: '',
    email: '',
    phone: '',
  };

  const newPlayerFormRef = useRef();
  const [playerPosition, setPlayerPosition] = useState();
  const [initialValues, setInitialValues] = useState(init);

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
    } catch (err) {
      console.log(err);
    } finally {
      setIsVisible(false);
      popScreen();
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
              data: {...values, coach: [user?.id], profileImg: url},
              callback: async () =>
                await playerQuery(user?.id)
                  .doc(id)
                  .collection('stats')
                  .doc('global')
                  .set(emptyStats),
            }),
        );
      } else {
        addDocument({
          docId: id,
          data: {...values, coach: [user?.id]},
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

  const handleSubmitForm = () => {
    newPlayerFormRef?.current.handleSubmit();
  };

  useEffect(() => {
    const getPlayerInfo = async () => {
      const playerRef = await playerQuery(user?.id).doc(playerId).get();
      const player = playerRef.data();
      setInitialValues(player);
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
    initialValues,
    onImagePress,
    response,
    loading: loadingAddDocument,
  };
};
