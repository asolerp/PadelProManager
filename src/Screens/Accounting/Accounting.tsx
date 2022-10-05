import {useFocusEffect} from '@react-navigation/native';

import React, {useCallback} from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {getCurrencies} from 'react-native-localize';
import {AccountingItem} from '../../Components/Accounting/AccountingItem';
import {AccountingStat} from '../../Components/Accounting/AccountingStat';
import {Header, ScreenLayout} from '../../Components/Layout';

import {HDivider} from '../../Components/UI/HDivider';

import t from '../../Theme/theme';

import {getSessionAccountingResume} from '../../Utils/getSessionAccountingResume';
import {sortByDate} from '../../Utils/sorts';

import {useGetAccounting} from './hooks/useGetAccounting';

export const ACCOUTING_SCREEN_KEY = 'accountingScreen';

export const Accounting = () => {
  const {accounting, totalPending, total, refetch} = useGetAccounting();

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
      <Header title="Contabilidad" />
      <HDivider />
      <View style={[t.pX3, t.mT5, t.mB5, t.flexRow]}>
        <AccountingStat
          color={t.textErrorDark}
          label="Pendiente"
          value={`${totalPending} ${getCurrencies()[0]}`}
        />
        <View style={[t.mL2]} />
        <AccountingStat
          color={t.textSuccessDark}
          label="Total"
          value={`${total} ${getCurrencies()[0]}`}
        />
      </View>
      <FlatList
        data={accounting}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <HDivider />}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
};
