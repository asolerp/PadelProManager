import {useFocusEffect} from '@react-navigation/native';
import {format} from 'date-fns';
import React, {useCallback, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {Agenda} from 'react-native-calendars';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RenderItem} from '../../Components/Planner/RenderItem';
import {AddButton} from '../../Components/UI/AddButton';

import {HDivider} from '../../Components/UI/HDivider';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import {useGetSessions} from '../../Hooks/useGetSessions';
import {openScreenWithPush} from '../../Router/utils/actions';

import t from '../../Theme/theme';
import {DATE_FORM} from '../../Utils/date-ext';
import {NEW_SESSION_SCREEN_KEY} from '../NewSession/NewSession';

export const Planner = () => {
  const {sessions, markers, getSessions, loading} = useGetSessions();
  const [selectedDate, setSelectedDate] = useState();

  useFocusEffect(
    useCallback(() => {
      getSessions();
    }, []),
  );

  return (
    <SafeAreaView edges={['top']} style={[t.flexGrow, t.bgWhite]}>
      <AddButton
        iconName="ios-calendar"
        style={[t.bgSuccessLight]}
        onPress={() =>
          openScreenWithPush(NEW_SESSION_SCREEN_KEY, {
            startDate: selectedDate,
          })
        }
      />
      <Agenda
        items={sessions}
        selected={format(new Date(), 'yyyy-MM-dd')}
        onDayPress={day =>
          setSelectedDate(format(new Date(day?.timestamp), DATE_FORM))
        }
        renderItem={item => {
          return (
            item && (
              <View>
                <RenderItem
                  item={item}
                  style={[t.mR1, t.mY3]}
                  onPress={() =>
                    openScreenWithPush(NEW_SESSION_SCREEN_KEY, {session: item})
                  }
                />
              </View>
            )
          );
        }}
        // Specify how each date should be rendered. day can be undefined if the item is not first in that day
        renderDay={(day, item) => {
          return (
            <View style={[t.pL3]}>
              {day ? (
                <>
                  <View style={[t.w20, t.mR3]}>
                    <Text style={[t.fontSansBold, t.text3xl]}>
                      {format(new Date(day), 'dd')}
                    </Text>
                    <Text style={[t.fontSans, t.textXs, t.textGray800]}>
                      {format(new Date(day), 'EEEE')}
                    </Text>
                  </View>
                </>
              ) : (
                <View style={[t.w20, t.mR3]} />
              )}
            </View>
          );
        }}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return (
            <>
              <View style={[t.h14, t.mY3]}>
                <Text style={(t.fontSansBold, t.textBase)}>
                  No tienes niguna clase este día.
                </Text>
              </View>
              <HDivider />
            </>
          );
        }}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return (
            <View style={[t.flexGrow, t.itemsCenter, t.justifyCenter, t.pX12]}>
              {loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <Text style={(t.fontSansBold, t.textXl, t.textCenter)}>
                  No tienes niguna clase para la fecha seleccionada
                </Text>
              )}
            </View>
          );
        }}
        // Specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        // Hide knob button. Default = false
        hideKnob={false}
        // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
        showClosingKnob={true}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={markers}
        // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
        disabledByDefault={true}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        onRefresh={() => getSessions()}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        refreshControl={null}
        // Agenda theme
        theme={{
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          backgroundColor: 'white',
          todayBackgroundColor: 'red',
        }}
        // Agenda container style
        style={[
          t.hFull,
          {
            backgroundColor: 'white',
            paddingHorizontal: 10,
          },
        ]}
      />
    </SafeAreaView>
  );
};
