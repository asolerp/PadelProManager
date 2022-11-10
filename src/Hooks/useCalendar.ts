import {useEffect} from 'react';
import RNCalendarEvents from 'react-native-calendar-events';

export const useCalendar = () => {
  useEffect(() => {
    RNCalendarEvents.requestPermissions();
  }, []);

  const getCalendars = async () => {
    const calendars = await RNCalendarEvents.findCalendars();
    console.log(calendars);
  };

  const saveEvent = async ({event}) => {
    console.log('EVENT', event);
    await RNCalendarEvents.saveEvent(event.title, {...event});
  };

  return {
    saveEvent,
    getCalendars,
  };
};
