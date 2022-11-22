import React from 'react';
import {View, Text, Keyboard} from 'react-native';
import t from '../../Theme/theme';

import {shortName} from '../../Utils/parsers';

import {NormalModal} from '../Modal/NormalModal';
import {Button} from '../UI/Button';
import {Input} from '../UI/Input';
import {useEditMatch} from './hooks/useEditMatch';

export const EditResultModal = ({isVisible, onClose, match}) => {
  //   const [visible, setVisible] = useState(isVisible);
  const {editedMatch, setEditedMatch, handleEditMatch} = useEditMatch({match});

  return (
    <NormalModal isVisible={isVisible} onClose={onClose}>
      <>
        <Text style={[t.fontSansBold, t.text2xl, t.textCenter, t.mB10]}>
          Editar resultado
        </Text>
        <View style={[t.flexCol, t.itemsCenter, t.mB5]}>
          <View style={[{width: '95%'}, t.mB3]}>
            <View style={[t.flexRow, t.itemsCenter, t.justifyBetween]}>
              <View style={[t.w16]}>
                <View style={[t.h8]} />
                <View style={[t.mR3, t.w16]}>
                  <Text style={[t.fontSansMedium]}>
                    {shortName(
                      1,
                      match?.t1?.[0]?.firstName,
                      match?.t1?.[0]?.secondName,
                    )}
                  </Text>
                  <Text style={[t.fontSansMedium]}>
                    {shortName(
                      2,
                      match?.t1?.[1]?.firstName,
                      match?.t1?.[1]?.secondName,
                    )}
                  </Text>
                </View>
              </View>
              <View style={[t.w14, t.justifyCenter, t.itemsCenter]}>
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
              <View style={[t.w14, t.justifyCenter, t.itemsCenter]}>
                <Text style={[t.mB3, t.fontSansMedium]}>Set 1</Text>
                <Input
                  keyboardType="numeric"
                  value={editedMatch?.s1t1?.toString()}
                  onChangeText={t => setEditedMatch({...editedMatch, s1t1: t})}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
              <View style={[t.w14, t.justifyCenter, t.itemsCenter]}>
                <Text style={[t.mB3, t.fontSansMedium]}>Set 2</Text>
                <Input
                  keyboardType="numeric"
                  value={editedMatch?.s2t1?.toString()}
                  onChangeText={t => setEditedMatch(old => ({...old, s2t1: t}))}
                />
              </View>
              <View style={[t.w14, t.justifyCenter, t.itemsCenter]}>
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
              <View style={[t.w16]}>
                <View style={[t.mR3, t.w16]}>
                  <Text style={[t.fontSansMedium]}>
                    {shortName(
                      3,
                      match?.t2?.[0]?.firstName,
                      match?.t2?.[0]?.secondName,
                    )}
                  </Text>
                  <Text style={[t.fontSansMedium]}>
                    {shortName(
                      4,
                      match?.t2?.[1]?.firstName,
                      match?.t2?.[1]?.secondName,
                    )}
                  </Text>
                </View>
              </View>
              <View style={[t.w14, t.justifyCenter, t.itemsCenter]}>
                <Input
                  keyboardType="numeric"
                  inputStyle={[t.textCenter]}
                  value={editedMatch?.team2?.toString()}
                  onChangeText={t =>
                    setEditedMatch(old => ({...old, team2: t}))
                  }
                  style={[t.w14]}
                />
              </View>
              <View style={[t.w14, t.justifyCenter, t.itemsCenter]}>
                <Input
                  keyboardType="numeric"
                  value={editedMatch?.s1t2?.toString()}
                  onChangeText={t => setEditedMatch(old => ({...old, s1t2: t}))}
                />
              </View>
              <View style={[t.w14, t.justifyCenter, t.itemsCenter]}>
                <Input
                  keyboardType="numeric"
                  value={editedMatch?.s2t2?.toString()}
                  onChangeText={t => setEditedMatch(old => ({...old, s2t2: t}))}
                />
              </View>
              <View style={[t.w14, t.justifyCenter, t.itemsCenter]}>
                <Input
                  keyboardType="numeric"
                  value={editedMatch?.s3t2?.toString()}
                  onChangeText={t => setEditedMatch(old => ({...old, s3t2: t}))}
                />
              </View>
            </View>
          </View>
        </View>
        <Button
          title="Editar"
          active
          onPress={async () => {
            onClose();
            handleEditMatch();
          }}
        />
      </>
    </NormalModal>
  );
};
