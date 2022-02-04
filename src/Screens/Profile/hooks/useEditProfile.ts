import {useContext, useEffect, useRef, useState} from 'react';
import {userQuery} from '../../../Api/queries';
import {AuthContext} from '../../../Context/AuthContex';
import {LoadingModalContext} from '../../../Context/LoadngModalContext';
import {useCameraOrLibrary} from '../../../Hooks/useCamerOrLibrary';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {useUploadCloudinaryImage} from '../../../Hooks/useUploadCloudinaryImage';
import {popScreen} from '../../../Router/utils/actions';
import {timeout} from '../../../Utils/timeout';
import firestore from '@react-native-firebase/firestore';
export const useEditProfile = () => {
  const {response, onImagePress} = useCameraOrLibrary();
  const {user, setUser} = useContext(AuthContext);

  const init = {
    firstName: '',
    secondName: '',
    gender: '',
    birthDate: '',
    address: '',
    municipio: '',
    provincia: '',
    email: '',
    phone: '',
  };
  const profileFormRef = useRef();
  const [initialValues, setInitialValues] = useState(init);
  const {setIsVisible, setText} = useContext(LoadingModalContext);
  const {uploadCloudinary} = useUploadCloudinaryImage();
  const {updateDocument, loading} = useUpdateDocument(userQuery);

  const handleSubmitForm = () => {
    profileFormRef?.current.handleSubmit();
  };

  const handleUpdateProfile = async values => {
    setText('Editando perfil...');
    setIsVisible(true);
    await timeout(1500);
    try {
      if (response?.assets?.length > 0) {
        await uploadCloudinary(
          response?.assets?.[0],
          `PadelPro/users/${user?.id}/avatar`,
          async url => {
            await updateDocument(user?.id, {
              ...values,
              profileImg: url,
            });
            setUser({
              ...user,
              ...values,
              profileImg: url,
            });
          },
        );
      } else {
        await updateDocument(user?.id, {...values});
      }
    } catch (err) {
      console.log(err);
    } finally {
      popScreen();
      setIsVisible(false);
    }
  };

  useEffect(() => {
    const getPlayerInfo = async () => {
      const userLocalQuery = await firestore()
        .collection('users')
        .doc(user?.id)
        .get();
      const userDB = userLocalQuery.data();
      setInitialValues(userDB);
    };
    if (user?.id) {
      getPlayerInfo();
    }
  }, [user?.id]);

  return {
    handleUpdateProfile,
    handleSubmitForm,
    profileFormRef,
    initialValues,
    onImagePress,
    response,
    loading,
  };
};
