import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';

import {TabView, TabBar} from 'react-native-tab-view';

import t from '../../Theme/theme';
import {Button} from '../UI/Button';

import {HistoricRoute} from './Tabs/HistoryRoute';
import {NotesRoute} from './Tabs/NotesRoute';
import {StatisticsRoute} from './Tabs/StatisticsRoute';

export const MatchTabs = ({match, notes, pointsHistory}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'notes', title: 'Notas'},
    {key: 'statistics', title: 'Estadísticas'},
    {key: 'historic', title: 'Histórioco'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'notes':
        return <NotesRoute notes={notes} />;
      case 'statistics':
        return <StatisticsRoute statistics={match?.statistics} />;
      case 'historic':
        return <HistoricRoute match={match} pointsHistory={pointsHistory} />;
      default:
        return null;
    }
  };

  return (
    <TabView
      renderTabBar={props => (
        <TabBar
          {...props}
          style={{backgroundColor: null}}
          indicatorStyle={{backgroundColor: null}}
          renderLabel={({route, focused}) => {
            const isFocused = focused ? t.opacity100 : t.opacity30;
            return (
              <Text style={[t.fontSansBold, t.textBlack, isFocused]}>
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
    />
  );
};
