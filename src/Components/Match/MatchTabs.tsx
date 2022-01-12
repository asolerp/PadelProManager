import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import t from '../../Theme/theme';

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

const HistoricRoute = () => (
  <View style={[t.flex1, t.justifyCenter, t.itemsCenter]}>
    <Text>3</Text>
  </View>
);

const renderScene = SceneMap({
  notes: NotesRoute,
  statistics: StatisticsRoute,
  historic: HistoricRoute,
});

export const MatchTabs = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'notes', title: 'Notas'},
    {key: 'statistics', title: 'Estadísticas'},
    {key: 'historic', title: 'Histórioco'},
  ]);

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
