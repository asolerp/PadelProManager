import React, {useEffect, useState} from 'react';
import {Text, useWindowDimensions} from 'react-native';

import {TabView, TabBar} from 'react-native-tab-view';
import {usePermissions} from '../../Hooks/usePermissions';

import t from '../../Theme/theme';

import {HistoricRoute} from './Tabs/HistoryRoute';
import {NotesRoute} from './Tabs/NotesRoute';
import {StatisticsRoute} from './Tabs/StatisticsRoute';

export const MatchTabs = ({match, notes, pointsHistory}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const {getIsOwner} = usePermissions();
  const [routes, setRoutes] = useState<any>();

  useEffect(() => {
    const isOnwer = getIsOwner(match?.owner);
    if (isOnwer) {
      setRoutes([
        {key: 'statistics', title: 'Estadísticas'},
        {key: 'historic', title: 'Histórioco'},
        {key: 'notes', title: 'Notas'},
      ]);
    } else {
      setRoutes([
        {key: 'statistics', title: 'Estadísticas'},
        {key: 'historic', title: 'Histórioco'},
      ]);
    }
  }, [match?.owner]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'notes':
        return <NotesRoute matchId={match?.id} notes={notes} />;
      case 'statistics':
        return (
          <StatisticsRoute
            advanceStats={match?.advanceStats}
            team1={match?.t1}
            team2={match?.t2}
            statistics={match?.statistics}
            goldPoint={match?.game?.goldPoint}
          />
        );
      case 'historic':
        return <HistoricRoute match={match} pointsHistory={pointsHistory} />;
      default:
        return null;
    }
  };

  return (
    <>
      {routes && (
        <TabView
          renderTabBar={props => (
            <TabBar
              {...props}
              style={[{backgroundColor: null}, t.pX4]}
              indicatorStyle={{backgroundColor: null}}
              renderLabel={({route, focused}) => {
                const isFocused = focused ? t.opacity100 : t.opacity30;
                return (
                  <Text
                    style={[
                      t.fontSansBold,
                      t.textBlack,
                      t.textBase,
                      isFocused,
                    ]}>
                    {route.title}
                  </Text>
                );
              }}
            />
          )}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          style={[t.bgWhite]}
        />
      )}
    </>
  );
};
