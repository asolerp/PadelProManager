import {format, setHours, setMinutes} from 'date-fns';
import {useContext, useEffect, useRef, useState} from 'react';
import {accountingQuery, sessionQuery} from '../../../Api/queries';
import {AuthContext} from '../../../Context/AuthContex';
// import * as Localization from 'expo-localization';

import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {popScreen} from '../../../Router/utils/actions';
import {DATE_FORM, HOUR_FORMAT} from '../../../Utils/date-ext';
import {ddmmyyyyToDate} from '../../../Utils/parsers';
import {timeout} from '../../../Utils/timeout';

import {firebaseIDGenerator} from '../../../Utils/firebaseIDGenerator';
import {defaultFunctions} from '../../../Lib/API/firebaseApp';

export const useNewSessionForm = ({startDate, session}) => {
  const {user} = useContext(AuthContext);

  const [sessionColor, setSessionColor] = useState(session?.color || 'blue');
  const [loading, setLoading] = useState(false);
  const [repDays, setRepDays] = useState(session?.week || []);
  const [startDateParsed, setStartDateParsed] = useState();
  const [selectedPlayers, setSelectedPlayers] = useState(
    session?.players || [],
  );
  const [init, setInit] = useState({
    title: '',
    description: '',
    price: 0,
    date: startDate || format(new Date(), DATE_FORM),
    startTime: '',
    endTime: '',
    notes: '',
    club: '',
  });

  const newSessionFormRef = useRef();
  const {updateDocument} = useUpdateDocument(sessionQuery);
  const {updateDocument: updateAccounting} = useUpdateDocument(accountingQuery);

  const newSessionsFn = defaultFunctions.httpsCallable('newSession');

  const handleSetRepDays = day => {
    if (repDays.some(d => d === day)) {
      setRepDays(repDays.filter(d => d !== day));
    } else {
      setRepDays(old => old.concat([day]));
    }
  };

  const handleSubmitForm = () => {
    newSessionFormRef?.current.handleSubmit();
  };

  const handleSubmitSessionForm = async form => {
    const dateParts = form?.date.split('/');
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    const timestampDate = Date.UTC(
      +dateParts[2],
      dateParts[1] - 1,
      +dateParts[0],
      0,
      0,
      0,
    );

    const startHour = form?.startTime?.split(':')[0];
    const startMinutes = form?.startTime?.split(':')[1];
    const endHour = form?.endTime?.split(':')[0];
    const endMinutes = form?.endTime?.split(':')[1];
    const price = form?.price;

    const startTimeWithHours = setHours(dateObject, startHour);
    const startTimeWithMinutes = setMinutes(startTimeWithHours, startMinutes);

    const endTimeWithHours = setHours(dateObject, endHour);
    const endTimeWithMinutes = setMinutes(endTimeWithHours, endMinutes);

    const payload = {
      ...form,
      players: selectedPlayers,
      playersEmail: selectedPlayers.map(p => p?.email),
      coachId: user?.id,
      date: Number(timestampDate),
      price,
      // currency: String(Localization.currency),
      startTime: Number(format(new Date(startTimeWithMinutes), 'T')),
      endTime: Number(format(new Date(endTimeWithMinutes), 'T')),
      color: sessionColor,
      week: repDays,
    };

    setLoading(true);

    try {
      if (session) {
        await updateAccounting(session.accountingId, {
          price: payload.price,
          currency: payload.currency,
          players: selectedPlayers.reduce((acc, p) => {
            return {
              ...acc,
              [p.id]: false,
            };
          }),
        });
        await updateDocument(session?.id, {
          ...payload,
          week: [],
          internalId: firebaseIDGenerator(),
        });
      } else {
        await newSessionsFn({
          payload,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      await timeout(1000);
      setLoading(false);
      popScreen();
    }
  };

  useEffect(() => {
    if (session) {
      const sessionDate = new Date(session?.date);
      setStartDateParsed(sessionDate);

      setInit({
        ...session,
        date: format(sessionDate, DATE_FORM),
        startTime: format(Number(session?.startTime), HOUR_FORMAT),
        endTime: format(Number(session?.endTime), HOUR_FORMAT),
      });
    }
    if (startDate) {
      setStartDateParsed(ddmmyyyyToDate(startDate));
    }
  }, [session, startDate]);

  return {
    loading,
    repDays,
    sessionColor,
    startDateParsed,
    setSessionColor,
    selectedPlayers,
    handleSetRepDays,
    handleSubmitForm,
    newSessionFormRef,
    setSelectedPlayers,
    setStartDateParsed,
    initialValues: init,
    handleSubmitSessionForm,
  };
};
