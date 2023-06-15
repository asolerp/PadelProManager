import {useEffect} from 'react';
import RNCalendarEvents from 'react-native-calendar-events';

export const useCalendar = () => {
  useEffect(() => {
    RNCalendarEvents.requestPermissions();
  }, []);

  const getCalendars = async () => {
    return await RNCalendarEvents.findCalendars();
  };

  const saveEvent = async ({event}) => {
    await RNCalendarEvents.saveEvent(event.title, {...event});
  };

  return {
    saveEvent,
    getCalendars,
  };
};
