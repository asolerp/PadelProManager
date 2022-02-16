import functions from '@react-native-firebase/functions';
import {useState} from 'react';

export const useGetSessions = () => {
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState();
  const [markers, setMarkers] = useState();

  const getSessions = async (callback?: () => void) => {
    const sessionsFn = functions().httpsCallable('getCalendar');
    setLoading(true);
    try {
      const availableSessions = await sessionsFn();
      setSessions(availableSessions?.data?.sessions);
      setMarkers(availableSessions?.data?.markers);
    } catch (err) {
      console.log(err);
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
