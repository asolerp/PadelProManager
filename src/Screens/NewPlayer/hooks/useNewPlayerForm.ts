import {useCallback, useEffect, useRef, useState} from 'react';
import {playerQuery} from '../../../Api/queries';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import {useAddDocument} from '../../../Hooks/useAddDocument';
import {popScreen} from '../../../Router/utils/actions';

import {useUploadCloudinaryImage} from '../../../Hooks/useUploadCloudinaryImage';
import {firebaseIDGenerator} from '../../../Utils/firebaseIDGenerator';
import {emptyStats} from '../utils/emptyStats';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';

export const useNewPlayerForm = playerId => {
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

  const [response, setResponse] = useState<any>(null);
  const {uploadCloudinary} = useUploadCloudinaryImage();
  const [loading, setLoading] = useState(false);

  const onImagePress = useCallback(({type, options}) => {
    if (type === 'capture') {
      launchCamera(options, setResponse);
    } else {
      launchImageLibrary(options, setResponse);
    }
  }, []);

  const {addDocument, loading: loadingAddDocument} =
    useAddDocument(playerQuery);

  const {updateDocument} = useUpdateDocument(playerQuery);

  const handleUpdatePlayer = async values => {
    setLoading(true);
    try {
      if (response?.assets?.length > 0) {
        await uploadCloudinary(
          response?.assets?.[0],
          `PadelPro/users/${playerId}/avatar`,
          async url =>
            await updateDocument(playerId, {...values, profileImg: url}),
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      popScreen();
    }
  };

  const handleCreateNewPlayer = async values => {
    setLoading(true);
    const id = firebaseIDGenerator();
    try {
      await uploadCloudinary(
        response?.assets?.[0],
        `PadelPro/users/${id}/avatar`,
        async url =>
          await addDocument({
            docId: id,
            data: {...values, profileImg: url},
            callback: async () =>
              await firestore()
                .collection('players')
                .doc(id)
                .collection('stats')
                .doc('global')
                .set(emptyStats),
          }),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      popScreen();
    }
  };

  const handleSubmitForm = () => {
    newPlayerFormRef?.current.handleSubmit();
  };

  useEffect(() => {
    const getPlayerInfo = async () => {
      const playerQuery = await firestore()
        .collection('players')
        .doc(playerId)
        .get();
      const player = playerQuery.data();
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
    loading: loading || loadingAddDocument,
  };
};
