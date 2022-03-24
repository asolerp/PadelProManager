import functions from '@react-native-firebase/functions';
import {addDays, format} from 'date-fns';
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

      const days = Object.keys(availableSessions?.data?.sessions).sort(
        (a, b) => new Date(a) - new Date(b),
      );

      let initDay = days[0];
      let arrayDays = [initDay];

      const generateAllDays = () => {
        if (days.length > 0) {
          while (new Date(initDay) < new Date(days[days.length - 1])) {
            initDay = addDays(new Date(initDay), 1);
            arrayDays.push(initDay);
          }

          const parsedSessions = arrayDays.reduce(
            (acc, val) => {
              const day = format(new Date(val), 'yyyy-MM-dd');

              return {
                ...acc,
                [day]: availableSessions?.data?.sessions?.[day] || [],
              };
            },
            [{}],
          );
          setSessions(parsedSessions);
          setMarkers(availableSessions?.data?.markers);
        } else {
          setSessions(null);
          setMarkers(null);
        }
      };

      generateAllDays();
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
