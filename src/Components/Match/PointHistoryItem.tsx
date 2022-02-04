import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {resultGame} from '../../Utils/gameLogic';
import {shortName} from '../../Utils/parsers';
import {HDivider} from '../UI/HDivider';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  mapPreposicion,
  mapResult,
  mapResultColorStyle,
  mapShotColorStyles,
  mapShotName,
} from './utils/maps';
import {useHistory} from './hooks/useHistory';
import {BottomModal} from '../Modal/BottomModal';
import {Button} from '../UI/Button';
import {useState} from 'react';
import {Input} from '../UI/Input';
import PressableOpacity from '../UI/PressableOpacity';

export const PointHistoryItem = ({match, pointHistory}) => {
  const {s1t1, s1t2, s2t1, s2t2, s3t1, s3t2, set, service} =
    pointHistory?.gameState;

  const {
    handleAddAsFavorite,
    handleDeleteComment,
    handleAddComment,
    comment,
    setComment,
  } = useHistory(match?.id);
  const [visibleCommentModal, setVisibleCommentModal] = useState(false);

  const isHistoryPointSavedAsFavorite = match?.favoritePoints?.some(
    hId => hId === pointHistory?.id,
  );

  const getSetActive = setNumber =>
    set === setNumber
      ? [t.fontSansBold, t.opacity80]
      : [t.fontSansMedium, t.opacity30];

  const getGameActive = team =>
    service === team
      ? [t.fontSansBold, t.opacity80]
      : [t.fontSansMedium, t.opacity30];

  return (
    <>
      <BottomModal
        isVisible={visibleCommentModal}
        onClose={() => setVisibleCommentModal(false)}>
        <View style={[t.wFull, t.mB3]}>
          <Text style={[t.fontSansBold, t.text2xl, t.textLeft, t.mB5]}>
            Nuevo comentario
          </Text>
          <View style={[t.wFull]}>
            <Input
              label="Comentario"
              value={comment}
              multiline
              onChangeText={setComment}
              placeholder="Añade un comentario"
              style={[t.mB2]}
            />
          </View>
          <View>
            <Button
              active
              title="Guardar"
              onPress={() =>
                handleAddComment(pointHistory?.id, () =>
                  setVisibleCommentModal(false),
                )
              }
              disabled={!comment}
              style={[t.mT3]}
              textStyle={[t.textLg]}
            />
          </View>
        </View>
      </BottomModal>
      <View style={[t.pY3]}>
        <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mB3]}>
          <View style={[t.flexRow]}>
            <Text style={[t.mB1]}>
              <Text style={[getGameActive('t1')]}>
                {resultGame(pointHistory?.gameState).split('-')[0]}
              </Text>
              <Text style={[t.fontSansBold]}> : </Text>
              <Text style={[getGameActive('t2')]}>
                {resultGame(pointHistory?.gameState).split('-')[1]}
              </Text>
            </Text>
          </View>
          <View style={[t.flexRow]}>
            <Text style={[getSetActive(1)]}>{`${s1t1}-${s1t2}`}</Text>
            <Text style={[t.opacity30]}>,</Text>
            <Text style={[getSetActive(2)]}>{`${s2t1}-${s2t2}`}</Text>
            <Text style={[t.opacity30]}>,</Text>
            <Text style={[getSetActive(3)]}>{`${s3t1}-${s3t2}`}</Text>
          </View>
        </View>
        {pointHistory?.points?.map((p, i) => {
          const {player, result, point} = p;
          return (
            <View key={i}>
              <View style={[t.flexRow, t.flexWrap, t.itemsCenter, t.mB2]}>
                {p?.player && (
                  <Text style={[t.textBase]}>
                    <Text style={[t.fontSansBold]}>
                      {shortName(1, player?.firstName, player?.secondName)}
                    </Text>
                    <Text style={[t.fontSans]}> ha </Text>
                    <Text style={[t.fontSansBold, mapResultColorStyle[result]]}>
                      {mapResult[result]}{' '}
                    </Text>
                    <Text style={[t.fontSans]}>
                      {mapPreposicion?.[result]}{' '}
                    </Text>
                    <Text style={[t.fontSansBold, mapShotColorStyles[point]]}>
                      {mapShotName[point]}{' '}
                    </Text>
                  </Text>
                )}
                {p?.info && (
                  <Text style={[t.fontSans, t.mT2, t.textBase]}>{p?.info}</Text>
                )}
              </View>
            </View>
          );
        })}
        {pointHistory?.comment && (
          <View style={[t.maxW56, t.borderL, t.pL2]}>
            <Text style={[t.fontSansBold, t.mB1]}>Comentario</Text>
            <View style={[t.flexRow, t.itemsEnd]}>
              <Text style={[t.fontSans, t.textXs]}>
                {pointHistory?.comment}
              </Text>
              <PressableOpacity
                onPress={() => {
                  handleDeleteComment(pointHistory?.id);
                }}>
                <Icon
                  name="ios-trash"
                  color="#f44336"
                  size={17}
                  style={[t.mL3]}
                />
              </PressableOpacity>
            </View>
          </View>
        )}
        <View style={[t.flexRow, t.justifyEnd]}>
          <PressableOpacity
            onPress={() => {
              setComment(pointHistory?.comment);
              setVisibleCommentModal(true);
            }}>
            <Icon name="ios-chatbox-ellipses" color={'#a0aec0'} size={20} />
          </PressableOpacity>
          <PressableOpacity
            onPress={() =>
              handleAddAsFavorite(
                pointHistory?.id,
                isHistoryPointSavedAsFavorite,
              )
            }>
            <Icon
              name={
                isHistoryPointSavedAsFavorite
                  ? 'ios-heart-sharp'
                  : 'ios-heart-outline'
              }
              color={isHistoryPointSavedAsFavorite ? '#d32f2f' : '#a0aec0'}
              size={20}
              style={[t.mL3]}
            />
          </PressableOpacity>
        </View>
      </View>
      <HDivider />
    </>
  );
};
