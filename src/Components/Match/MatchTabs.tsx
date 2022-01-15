import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {TabView, TabBar} from 'react-native-tab-view';
import t from '../../Theme/theme';
import {PointHistoryItem} from './PointHistoryItem';

const NotesRoute = () => (
  <View style={[t.flex1, t.justifyCenter, t.itemsCenter]}>
    <Text>1</Text>
  </View>
);

const StatisticsRoute = () => (
  <View style={[t.flex1, t.justifyCenter, t.itemsCenter]}>
    <Text>2</Text>
  </View>
);

const HistoricRoute = ({game, pointsHistory}) => (
  <ScrollView showsVerticalScrollIndicator={false} style={[t.flex1]}>
    <Text style={[t.fontSansMedium, t.textCenter, t.mT4]}>
      ¡Empieza el partido!
    </Text>
    {pointsHistory
      ?.sort((a, b) => new Date(b.date.toDate()) - new Date(a.date.toDate()))
      ?.map((p, i) => (
        <PointHistoryItem key={i} pointHistory={p} />
      ))}
  </ScrollView>
);

export const MatchTabs = ({match, pointsHistory}) => {
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
        return <NotesRoute />;
      case 'statistics':
        return <StatisticsRoute />;
      case 'historic':
        return (
          <HistoricRoute game={match?.game} pointsHistory={pointsHistory} />
        );
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
