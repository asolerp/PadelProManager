import {useFocusEffect} from '@react-navigation/native';
import {format} from 'date-fns';
import React, {useCallback, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

import {Calendar, CalendarUtils, LocaleConfig} from 'react-native-calendars';

import {AddButton} from '../../Components/UI/AddButton';

import {useGetSessions} from '../../Hooks/useGetSessions';
import {openDrawer, openScreenWithPush} from '../../Router/utils/actions';

import t from '../../Theme/theme';
import {CALENDAR_DATE_FORMAT, HOUR_FORMAT} from '../../Utils/date-ext';

import {NEW_SESSION_SCREEN_KEY} from '../NewSession/NewSession';
import {Header, ScreenLayout} from '../../Components/Layout';

import {FocusAwareStatusBar} from '../../Components/Drawer/FocusAwareStatusBar';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import PressableOpacity from '../../Components/UI/PressableOpacity';
import {Chip} from '../../Components/UI/Chip';

import {colorParser} from '../../Utils/sessionParsers';
import {useCalendar} from '../../Hooks/useCalendar';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {useAnimateMapContainer} from './hooks/useAnimateMapContainer';
import Animated from 'react-native-reanimated';
import {useFirebaseAuth} from '../../Context/FirebaseContext';
import {Roles} from '../../Global/types';

LocaleConfig.locales.es = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mier.', 'Jue.', 'Vie.', 'Sab.'],
  today: 'Hoy',
};

LocaleConfig.defaultLocale = 'es';

const INITIAL_DATE = CalendarUtils.getCalendarDateString(new Date());

export const Planner = () => {
  useCalendar();
  const {user} = useFirebaseAuth();
  const {sessions, markers, getSessions} = useGetSessions();
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [fetching, setFetching] = useState(true);

  const {gestureHandler, containerStyles} = useAnimateMapContainer();

  const renderItem = ({item}) => {
    return (
      <>
        <PressableOpacity
          onPress={() =>
            user?.role !== Roles.PLAYER &&
            openScreenWithPush(NEW_SESSION_SCREEN_KEY, {session: item})
          }
          style={[
            t.p3,
            {height: item.height},
            t.border0_5,
            colorParser[item.type === 'session' ? 'blue' : 'yellow'],
            t.roundedSm,
            t.shadow,
            t.flexRow,
          ]}>
          <View style={[t.flex1]}>
            <View style={[t.flexRow, t.justifyBetween, t.itemsStart, t.mB2]}>
              <View style={[t.flexRow, t.itemsCenter]}>
                <FontAwesome name="map-marker" color="white" style={[t.mR1]} />
                {item?.club && (
                  <Text style={[t.fontSansMedium, t.textXs, t.textGray300]}>
                    {item?.club}
                  </Text>
                )}
              </View>
              <View style={[t.itemsEnd]}>
                {!!item?.startTime && !!item?.endTime && (
                  <View style={[t.flexRow, t.itemsCenter, t.justifyCenter]}>
                    <Icon name="ios-time-outline" color="white" />
                    <Chip
                      mainColor={
                        item.type === 'session' ? 'info' : 'warningDark'
                      }
                      text={`${format(
                        Number(item?.startTime),
                        HOUR_FORMAT,
                      )} - ${format(Number(item?.endTime), HOUR_FORMAT)}`}
                    />
                  </View>
                )}
              </View>
            </View>
            <View style={[t.flexRow, t.justifyBetween, t.itemsEnd]}>
              <View style={{width: '70%'}}>
                <View style={[t.flexRow, t.itemsCenter, t.justifyBetween]}>
                  <Text style={[t.fontSansBold, t.textWhite, t.textSm, t.mB1]}>
                    {item?.title}
                  </Text>
                </View>
                {item?.notes && (
                  <Text style={[t.fontSansMedium, t.textXs, t.textGray300]}>
                    {item?.notes}
                  </Text>
                )}
              </View>
              {item.price > 0 && (
                <Text style={[t.fontSansBold, t.textWhite, t.textLg]}>
                  {item.price} {item.currency}
                </Text>
              )}
            </View>
          </View>
        </PressableOpacity>
      </>
    );
  };

  useFocusEffect(
    useCallback(() => {
      getSessions(() => setFetching(false));
    }, []),
  );

  const marked = useMemo(
    () => ({
      ...markers,
      '2022-11-09': {
        marked: true,
        selectedColor: 'red',
        selectedDotColor: 'red',
      },
      [CalendarUtils.getCalendarDateString(selected)]: {
        selected: true,
        selectedColor: 'white',
        selectedTextColor: t.textGray900.color,
      },
    }),
    [selected, markers],
  );

  const onDayPress = useCallback(day => {
    setSelected(format(new Date(day?.timestamp), CALENDAR_DATE_FORMAT));
  }, []);

  return (
    <ScreenLayout style={[t.bgGray900]}>
      <AddButton
        iconName="ios-add"
        style={[t.bgInfoLight]}
        onPress={() =>
          openScreenWithPush(NEW_SESSION_SCREEN_KEY, {
            startDate: selected,
          })
        }
      />
      <Header
        mode="dark"
        title="Sesiones"
        leftSide={
          user?.role !== Roles.PLAYER && (
            <PressableOpacity onPress={openDrawer}>
              <Icon name="ios-menu" color="white" size={25} />
            </PressableOpacity>
          )
        }
        rightSide={
          <PressableOpacity
            onPress={() => {
              setFetching(true);
              getSessions(() => setFetching(false));
            }}>
            <Icon name="sync" color="white" size={25} />
          </PressableOpacity>
        }
      />
      <FocusAwareStatusBar barStyle="light-content" />
      <Calendar
        markingType="multi-dot"
        style={[t.mB3]}
        enableSwipeMonths
        initialDate={INITIAL_DATE}
        onDayPress={onDayPress}
        markedDates={marked}
        theme={{
          calendarBackground: t.bgGray900.backgroundColor,
          arrowColor: t.bgWhite.backgroundColor,
          monthTextColor: t.textWhite.color,
          dayTextColor: t.textWhite.color,
          textMonthFontFamily: t.fontSansBold.fontFamily,
          textDisabledColor: t.textGray600.color,
        }}
      />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            containerStyles,
            t.bgWhite,
            t.flexGrow,
            t.roundedTlXl,
            t.roundedTrXl,
            t.pX5,
            t.pT3,
          ]}>
          <View style={[t.justifyCenter, t.itemsCenter]}>
            <View style={[t.w12, t.h2, t.roundedFull, t.bgGray300, t.mB4]} />
          </View>
          <Text style={[t.fontSansMedium, t.textGray900, t.textXl, t.mB4]}>
            Sesiones del día
          </Text>
          <>
            {fetching ? (
              <View style={[t.flexGrow, t.itemsCenter, t.justifyStart]}>
                <ActivityIndicator style={[t.mT10]} />
              </View>
            ) : (
              <View style={[t.flexGrow]}>
                <FlatList
                  contentInset={{bottom: -80}}
                  data={sessions?.[
                    CalendarUtils.getCalendarDateString(selected)
                  ]?.sort(
                    (objA, objB) =>
                      Number(objA.startTime) - Number(objB.startTime),
                  )}
                  ListEmptyComponent={() => (
                    <View style={[t.flexGrow, t.justifyCenter, t.itemsCenter]}>
                      <Text style={[t.fontSans, t.textCenter, t.w60, t.mT10]}>
                        No tienes ninguna clase en el día seleccionado
                      </Text>
                    </View>
                  )}
                  keyExtractor={item => item.id}
                  renderItem={renderItem}
                  ItemSeparatorComponent={() => <View style={[t.mB2]} />}
                />
              </View>
            )}
          </>
        </Animated.View>
      </PanGestureHandler>
      {/* <Agenda
        items={sessions}
        selected={format(new Date(), 'yyyy-MM-dd')}
        onDayPress={day =>
          setSelectedDate(format(new Date(day?.timestamp), DATE_FORM))
        }
        renderItem={item => {
          return (
            <RenderItem
              item={item}
              style={[t.mR3, t.mY3]}
              onPress={() =>
                openScreenWithPush(NEW_SESSION_SCREEN_KEY, {session: item})
              }
            />
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
                      {capitalize(
                        format(new Date(day), 'EEEE', {
                          locale: es,
                        }),
                      )}
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
              <View style={[t.h14, t.mY3, t.justifyCenter, t.itemsCenter]}>
                <Text style={(t.fontSansBold, t.textXs)}>
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
              {fetching ? (
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
          return newContentChecker(r1, r2);
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
          reservationsBackgroundColor: 'white',
        }}
        // Agenda container style
        style={[t.hFull]}
      /> */}
    </ScreenLayout>
  );
};
