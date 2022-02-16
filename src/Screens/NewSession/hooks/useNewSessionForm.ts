import {format, setHours, setMinutes} from 'date-fns';
import {useContext, useEffect, useRef, useState} from 'react';
import {sessionQuery} from '../../../Api/queries';
import {AuthContext} from '../../../Context/AuthContex';
import {LoadingModalContext} from '../../../Context/LoadingModalContext';
import {useAddDocument} from '../../../Hooks/useAddDocument';
import {popScreen} from '../../../Router/utils/actions';
import {DATE_FORM, HOUR_FORMAT} from '../../../Utils/date-ext';

export const useNewSessionForm = ({startDate, session}) => {
  const {user} = useContext(AuthContext);
  const {setText, setIsVisible} = useContext(LoadingModalContext);
  const [init, setInit] = useState({
    title: '',
    description: '',
    date: startDate || format(new Date(), DATE_FORM),
    startTime: '',
    endTime: '',
  });

  const newSessionFormRef = useRef();
  const {addDocument} = useAddDocument(sessionQuery(user?.id));

  const handleSubmitForm = () => {
    newSessionFormRef?.current.handleSubmit();
  };

  const handleSaveNewSession = async form => {
    setIsVisible(true);
    const dateParts = form?.date.split('/');
    const dateObject = Date.UTC(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    const startHour = form?.startTime?.split(':')[0];
    const startMinutes = form?.startTime?.split(':')[1];
    const endHour = form?.endTime?.split(':')[0];
    const endMinutes = form?.endTime?.split(':')[1];

    const startTimeWithHours = setHours(dateObject, startHour);
    const startTimeWithMinutes = setMinutes(startTimeWithHours, startMinutes);

    const endTimeWithHours = setHours(dateObject, endHour);
    const endTimeWithMinutes = setMinutes(endTimeWithHours, endMinutes);

    try {
      setText('Creando nueva sesión...');
      await addDocument({
        data: {
          ...form,
          date: dateObject,
          startTime: startTimeWithMinutes,
          endTime: endTimeWithMinutes,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsVisible(false);
      popScreen();
    }
  };

  useEffect(() => {
    if (session) {
      const startTime = new Date(
        session?.startTime?._seconds * 1000 +
          session?.startTime?._nanoseconds / 1000000,
      );

      const endTime = new Date(
        session?.endTime?._seconds * 1000 +
          session?.endTime?._nanoseconds / 1000000,
      );

      setInit({
        ...session,
        startTime: format(startTime, HOUR_FORMAT),
        endTime: format(endTime, HOUR_FORMAT),
      });
    }
  }, [session]);

  return {
    handleSubmitForm,
    newSessionFormRef,
    initialValues: init,
    handleSaveNewSession,
  };
};
