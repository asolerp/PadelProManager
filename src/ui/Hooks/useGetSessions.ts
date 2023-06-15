import {addDays, format} from 'date-fns';
import {useState} from 'react';
import {defaultFunctions} from '../Lib/API/firebaseApp';

export const useGetSessions = () => {
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState();
  const [markers, setMarkers] = useState();

  const getSessions = async (callback?: () => void) => {
    const sessionsFn = defaultFunctions.httpsCallable('getCalendar');

    setLoading(true);
    try {
      const availableSessions = await sessionsFn();

      setMarkers(availableSessions.data.markers);
      setSessions(availableSessions.data.sessions);
    } catch (err) {
      console.log('ERROR', err);
    } finally {
      setLoading(false);
      callback && callback();
    }
  };

  return {
    getSessions,
    sessions,
    markers,
    loading,
  };
};
