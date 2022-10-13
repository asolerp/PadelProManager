import firestore from '@react-native-firebase/firestore';
import {useContext, useState} from 'react';
import {AuthContext} from '../../../Context/AuthContex';
import {LoadingModalContext} from '../../../Context/LoadingModalContext';
import {useCameraOrLibrary} from '../../../Hooks/useCamerOrLibrary';
import {useUploadCloudinaryImage} from '../../../Hooks/useUploadCloudinaryImage';
import {CONVERSATIONS, GROUPS} from '../../../Models/entities';
import {popScreen} from '../../../Router/utils/actions';
import {firebaseIDGenerator} from '../../../Utils/firebaseIDGenerator';

export const useCreateGroup = () => {
  const {user} = useContext(AuthContext);
  const {response, onImagePress} = useCameraOrLibrary();
  const [groupName, setGroupName] = useState();

  const {uploadCloudinary} = useUploadCloudinaryImage();

  const {setIsVisible, setText} = useContext(LoadingModalContext);

  const handleDeleteGroup = async groupId => {
    setIsVisible(true);
    setText('Eliminando grupo...');
    try {
      await firestore().collection(GROUPS).doc(groupId).delete();
      popScreen();
    } catch (err) {
      console.log(err);
    } finally {
      setIsVisible(false);
    }
  };

  const handleEditGroup = async (groupId, players) => {
    setIsVisible(true);
    setText('Editando grupo...');
    try {
      if (response?.assets?.length > 0) {
        await uploadCloudinary(
          response?.assets?.[0],
          `PadelPro/users/${user?.id}/groups/${groupId}`,
          async url => {
            await firestore()
              .collection(GROUPS)
              .doc(groupId)
              .update({
                groupName,
                groupImage: url,
                members: [...players.map(p => p.email)],
              });
          },
        );
      } else {
        console.log(groupId, 'ID');
        await firestore()
          .collection(GROUPS)
          .doc(groupId)
          .update({
            groupName,
            members: [...players.map(p => p.email)],
          });
      }
      popScreen();
    } catch (err) {
      console.log(err);
    } finally {
      setIsVisible(false);
    }
  };

  const handleCreateGroup = async players => {
    setIsVisible(true);
    setText('Creando nuevo grupo...');
    const id = firebaseIDGenerator();
    try {
      if (response?.assets?.length > 0) {
        await uploadCloudinary(
          response?.assets?.[0],
          `PadelPro/users/${user?.id}/groups/${id}`,
          async url => {
            await firestore()
              .collection(GROUPS)
              .doc(id)
              .set({
                coachId: user?.id,
                groupName,
                groupImage: url,
                members: [...players.map(p => p.email)],
              });

            await firestore()
              .collection(CONVERSATIONS)
              .add({
                groupId: id,
                coachEmail: user?.email,
                members: [user?.email, ...players.map(p => p.email)],
                type: 2,
              });
          },
        );
      } else {
        await firestore()
          .collection(GROUPS)
          .doc(id)
          .set({
            coachId: user?.id,
            groupName,
            members: [...players.map(p => p.email)],
          });

        await firestore()
          .collection(CONVERSATIONS)
          .add({
            groupId: id,
            coachEmail: user?.email,
            members: [user?.email, ...players.map(p => p.email)],
            type: 2,
          });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsVisible(false);
      popScreen();
    }
  };

  return {
    handleDeleteGroup,
    handleCreateGroup,
    handleEditGroup,
    onImagePress,
    setGroupName,
    groupName,
    response,
  };
};
