import React from 'react';
import {View} from 'react-native';
import t from '../../Theme/theme';
import {Button} from '../UI/Button';

interface Props {
  active: string;
  setActive: () => void;
}

export const SetSelector: React.FC<Props> = ({active, setActive}) => {
  return (
    <View style={[t.flexRow, t.justifyCenter, t.mB5]}>
      <Button
        onPress={() => setActive('total')}
        active={active === 'total'}
        title="Global"
        style={[t.mX1]}
        textStyle={[t.textXs]}
      />
      <Button
        onPress={() => setActive('s1')}
        active={active === 's1'}
        title="Set1"
        style={[t.mX1]}
        textStyle={[t.textXs]}
      />
      <Button
        onPress={() => setActive('s2')}
        active={active === 's2'}
        title="Set2"
        style={[t.mX1]}
        textStyle={[t.textXs]}
      />
      <Button
        onPress={() => setActive('s3')}
        active={active === 's3'}
        title="Set3"
        style={[t.mX1]}
        textStyle={[t.textXs]}
      />
    </View>
  );
};
