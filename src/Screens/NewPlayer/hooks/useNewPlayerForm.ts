import {useCallback, useRef, useState} from 'react';
import {playerQuery} from '../../../Api/queries';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {useAddDocument} from '../../../Hooks/useAddDocument';
import {popScreen} from '../../../Router/utils/actions';
import firestore from '@react-native-firebase/firestore';
import {useUploadCloudinaryImage} from '../../../Hooks/useUploadCloudinaryImage';
import {firebaseIDGenerator} from '../../../Utils/firebaseIDGenerator';
import {emptyStats} from '../utils/emptyStats';

export const useNewPlayerForm = () => {
  const newPlayerFormRef = useRef();
  const [playerPosition, setPlayerPosition] = useState();

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

  const initialValues = {
    firstName: '',
    secondName: '',
    gender: '',
    birthDate: '',
    hand: '',
    category: '',
    email: '',
    phone: '',
  };

  return {
    handleCreateNewPlayer,
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
