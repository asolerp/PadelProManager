import {format, setHours, setMinutes} from 'date-fns';
import {useEffect, useRef, useState} from 'react';

// import * as Localization from 'expo-localization';

import {popScreen} from '../../../Router/utils/actions';
import {timeout} from '../../../Utils/timeout';

import firestore from '@react-native-firebase/firestore';
import {getCurrencies} from 'react-native-localize';
import {useFirebaseAuth} from '../../../Context/FirebaseContext';

export const useNewOpenSessionForm = () => {
  const {user} = useFirebaseAuth();

  const [loading, setLoading] = useState(false);
  const [startDateParsed, setStartDateParsed] = useState();

  const init = {
    title: '',
    municipio: '',
    provincia: '',
    price: 0,
    date: '',
    startTime: '',
    endTime: '',
    notes: '',
    club: '',
  };

  const newSessionFormRef = useRef();

  const handleSubmitForm = () => {
    newSessionFormRef?.current.handleSubmit();
  };

  const handleSubmitSessionForm = async form => {
    let dateParts;

    let timestampDate;

    if (form?.date) {
      dateParts = form?.date?.split('/');

      timestampDate = Date.UTC(
        +dateParts[2],
        dateParts[1] - 1,
        +dateParts[0],
        0,
        0,
        0,
      );
    }

    const startHour = form?.startTime?.split(':')[0];
    const startMinutes = form?.startTime?.split(':')[1];
    const endHour = form?.endTime?.split(':')[0];
    const endMinutes = form?.endTime?.split(':')[1];
    const price = form?.price;

    const startTimeWithHours = setHours(new Date(), startHour);
    const startTimeWithMinutes = setMinutes(startTimeWithHours, startMinutes);

    const endTimeWithHours = setHours(new Date(), endHour);
    const endTimeWithMinutes = setMinutes(endTimeWithHours, endMinutes);

    const payload = {
      ...form,
      coachId: user?.id,
      coach: user,
      date: form.date ? Number(timestampDate) : null,
      price,
      currency: String(getCurrencies()[0]),
      startTime: Number(format(new Date(startTimeWithMinutes), 'T')),
      endTime: Number(format(new Date(endTimeWithMinutes), 'T')),
    };

    setLoading(true);

    try {
      await firestore()
        .collection('openSession')
        .add({
          ...payload,
        });
    } catch (err) {
      console.log(err);
    } finally {
      await timeout(1000);
      setLoading(false);
      popScreen();
    }
  };

  return {
    loading,
    startDateParsed,
    handleSubmitForm,
    newSessionFormRef,
    setStartDateParsed,
    initialValues: init,
    handleSubmitSessionForm,
  };
};
