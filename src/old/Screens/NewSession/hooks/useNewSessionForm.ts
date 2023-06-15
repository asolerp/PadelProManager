import {format, setHours, setMinutes} from 'date-fns';
import {useEffect, useRef, useState} from 'react';

// import * as Localization from 'expo-localization';

import {popScreen} from '../../../../ui/Router/utils/actions';
import {DATE_FORM, HOUR_FORMAT} from '../../../../ui/Utils/date-ext';
import {ddmmyyyyToDate} from '../../../../ui/Utils/parsers';
import {timeout} from '../../../../ui/Utils/timeout';

import {firebaseIDGenerator} from '../../../../ui/Utils/firebaseIDGenerator';
import {defaultFunctions} from '../../../../ui/Lib/API/firebaseApp';
import {ACCOUNTING, SESSIONS} from '../../../../ui/Models/entities';
import firestore from '@react-native-firebase/firestore';
import {getCurrencies} from 'react-native-localize';
import {useFirebaseAuth} from '../../../Context/FirebaseContext';
import {useCalendar} from '../../../../ui/Hooks/useCalendar';

export const useNewSessionForm = ({startDate, session}) => {
  const {user} = useFirebaseAuth();
  const {saveEvent} = useCalendar();

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
    date: startDate
      ? format(new Date(startDate), DATE_FORM)
      : format(new Date(), DATE_FORM),
    startTime: '',
    endTime: '',
    notes: '',
    club: '',
  });

  const newSessionFormRef = useRef();
  // const {updateDocument} = useUpdateDocument(sessionQuery);

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
      currency: String(getCurrencies()[0]),
      startTime: Number(format(new Date(startTimeWithMinutes), 'T')),
      endTime: Number(format(new Date(endTimeWithMinutes), 'T')),
      color: sessionColor,
      week: repDays,
    };

    setLoading(true);

    try {
      if (session) {
        await firestore()
          .collection(SESSIONS)
          .doc(session?.id)
          .update({
            ...payload,
            week: [],
            internalId: firebaseIDGenerator(),
          });

        await firestore()
          .collection(ACCOUNTING)
          .doc(session.accountingId)
          .update({
            date: payload.date,
            price: payload.price,
            currency: payload.currency,
            players: payload.players.reduce((acc, player) => {
              return {
                ...acc,
                [player.id]: false,
              };
            }, {}),
          });
      } else {
        await newSessionsFn({
          payload: {
            ...payload,
            type: 'session',
          },
        });
        await saveEvent({
          event: {
            title: payload.title,
            startDate: payload.startTime,
            endDate: payload.endTime,
            description: payload.notes,
            notes: payload.notes,
          },
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
