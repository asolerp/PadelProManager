import {useCallback, useEffect, useState} from 'react';
import {defaultFunctions} from '../../../Lib/API/firebaseApp';

export const useGetAccounting = () => {
  const accountingResume = defaultFunctions.httpsCallable('getResumen');

  const [accounting, setAccounting] = useState([]);
  const [totalPending, setTotalPending] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getAccounting = useCallback(async () => {
    const {data} = await accountingResume();

    setAccounting(data.accountingWithSessionData);
    setTotalPending(data.totalPending);
    setTotal(data.total);
  }, []);

  useEffect(() => {
    getAccounting();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      await Promise.all([getAccounting()]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {accounting, totalPending, total, loading, refetch};
};
