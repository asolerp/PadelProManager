import {useFocusEffect} from '@react-navigation/native';

import React, {useCallback} from 'react';
import {SectionList, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {getCurrencies} from 'react-native-localize';
import {AccountingItem} from '../../Components/Accounting/AccountingItem';
import {AccountingStat} from '../../Components/Accounting/AccountingStat';
import {Header, ScreenLayout} from '../../Components/Layout';

import {HDivider} from '../../Components/UI/HDivider';
import PressableOpacity from '../../Components/UI/PressableOpacity';

import t from '../../Theme/theme';

import {getSessionAccountingResume} from '../../Utils/getSessionAccountingResume';
import Icon from 'react-native-vector-icons/Ionicons';

import {useGetAccounting} from './hooks/useGetAccounting';
import {openDrawer} from '../../Router/utils/actions';
import {getDateAccounting} from './utils/getDateAccounting';

export const ACCOUTING_SCREEN_KEY = 'accountingScreen';

export const Accounting = () => {
  const {accounting, totalPending, total, refetch} = useGetAccounting();
  const accountingData = getDateAccounting(accounting);

  console.log('ACCOUNTING', accountingData);

  useFocusEffect(
    useCallback(() => {
      const refetching = refetch();
      return () => refetching;
    }, []),
  );

  const renderItem = ({item}) => {
    const balance = getSessionAccountingResume(item.players, item.price);
    return <AccountingItem item={item} balance={balance} />;
  };

  return (
    <ScreenLayout>
      <Header
        leftSide={
          <PressableOpacity onPress={openDrawer}>
            <Icon name="ios-menu" size={25} />
          </PressableOpacity>
        }
        title="Contabilidad"
      />
      <HDivider />
      <View style={[t.pX3, t.mT5, t.mB5, t.flexRow]}>
        <AccountingStat
          color={t.textErrorDark}
          label="Pendiente"
          value={`${Math.round(totalPending)} ${getCurrencies()[0]}`}
        />
        <View style={[t.mL2]} />
        <AccountingStat
          color={t.textSuccessDark}
          label="Total"
          value={`${Math.round(total)} ${getCurrencies()[0]}`}
        />
      </View>
      <View style={[t.flex1, t.pB5]}>
        <SectionList
          sections={accountingData}
          style={[t.flex1, t.mT3]}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({section: {title}}) => (
            <View style={[t.pX4, t.pY4, t.itemsCenter, t.bgInfoLight]}>
              {console.log()}
              <Text style={[t.fontSansBold, t.textWhite]}>
                {title.toUpperCase()}
              </Text>
            </View>
          )}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        {/* <FlatList
          data={accounting}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <HDivider />}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        /> */}
      </View>
    </ScreenLayout>
  );
};
