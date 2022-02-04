import React from 'react';
import {View, Text, Keyboard} from 'react-native';
import t from '../../Theme/theme';
import {mapPoints} from '../../Utils/gameLogic';
import {NormalModal} from '../Modal/NormalModal';
import {Button} from '../UI/Button';
import {Input} from '../UI/Input';
import {useEditMatch} from './hooks/useEditMatch';

export const EditResultModal = ({isVisible, onClose, match}) => {
  //   const [visible, setVisible] = useState(isVisible);
  const {editedMatch, setEditedMatch, handleEditMatch} = useEditMatch({match});

  console.log(editedMatch);

  return (
    <NormalModal isVisible={isVisible} onClose={onClose}>
      <>
        <Text style={[t.fontSansBold, t.text2xl, t.textCenter, t.mB10]}>
          Editar resultado
        </Text>
        <View style={[t.flexCol, t.itemsCenter, t.mB5]}>
          <View style={[{width: '95%'}, t.mB3]}>
            <View style={[t.flexRow, t.itemsCenter, t.justifyBetween]}>
              <View>
                <View style={[t.h8]} />
                <View style={[t.mR3]}>
                  <Text style={[t.fontSansMedium]}>A.Soler</Text>
                  <Text style={[t.fontSansMedium]}>A.Horrac</Text>
                </View>
              </View>
              <View style={[t.justifyCenter, t.itemsCenter]}>
                <Text style={[t.mB3, t.fontSansMedium]}>Juego</Text>
                <Input
                  keyboardType="numeric"
                  inputStyle={[t.textCenter]}
                  value={editedMatch?.team1?.toString()}
                  onChangeText={t =>
                    setEditedMatch(old => ({...old, team1: t}))
                  }
                  style={[t.w14]}
                />
              </View>
              <View style={[t.justifyCenter, t.itemsCenter]}>
                <Text style={[t.mB3, t.fontSansMedium]}>Set 1</Text>
                <Input
                  keyboardType="numeric"
                  value={editedMatch?.s1t1?.toString()}
                  onChangeText={t => setEditedMatch({...editedMatch, s1t1: t})}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
              <View style={[t.justifyCenter, t.itemsCenter]}>
                <Text style={[t.mB3, t.fontSansMedium]}>Set 2</Text>
                <Input
                  keyboardType="numeric"
                  value={editedMatch?.s2t1?.toString()}
                  onChangeText={t => setEditedMatch(old => ({...old, s2t1: t}))}
                />
              </View>
              <View style={[t.justifyCenter, t.itemsCenter]}>
                <Text style={[t.mB3, t.fontSansMedium]}>Set 3</Text>
                <Input
                  keyboardType="numeric"
                  value={editedMatch?.s3t1?.toString()}
                  onChangeText={t => setEditedMatch(old => ({...old, s3t1: t}))}
                />
              </View>
            </View>
          </View>
          <View style={[{width: '95%'}, t.mB3]}>
            <View style={[t.flexRow, t.itemsCenter, t.justifyBetween]}>
              <View style={[t.mR3]}>
                <Text style={[t.fontSansMedium]}>A.Soler</Text>
                <Text style={[t.fontSansMedium]}>A.Horrac</Text>
              </View>
              <Input
                keyboardType="numeric"
                inputStyle={[t.textCenter]}
                value={editedMatch?.team2?.toString()}
                onChangeText={t => setEditedMatch(old => ({...old, team2: t}))}
                style={[t.w14]}
              />
              <Input
                keyboardType="numeric"
                value={editedMatch?.s1t2?.toString()}
                onChangeText={t => setEditedMatch(old => ({...old, s1t2: t}))}
              />
              <Input
                keyboardType="numeric"
                value={editedMatch?.s2t2?.toString()}
                onChangeText={t => setEditedMatch(old => ({...old, s2t2: t}))}
              />
              <Input
                keyboardType="numeric"
                value={editedMatch?.s3t2?.toString()}
                onChangeText={t => setEditedMatch(old => ({...old, s3t2: t}))}
              />
            </View>
          </View>
        </View>
        <Button
          title="Editar"
          active
          onPress={() => {
            handleEditMatch();
            onClose();
          }}
        />
      </>
    </NormalModal>
  );
};
