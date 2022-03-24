import {useEffect, useState} from 'react';
import {firstSurname} from '../../../Utils/parsers';

export const useBarChart = ({players, winners, errorForced, nonForced}) => {
  const [data, setData] = useState();

  const hasDataP1 = winners?.p1 || errorForced?.p1 || nonForced?.p1;
  const hasDataP2 = winners?.p2 || errorForced?.p2 || nonForced?.p2;
  const hasDataP3 = winners?.p3 || errorForced?.p3 || nonForced?.p3;
  const hasDataP4 = winners?.p4 || errorForced?.p4 || nonForced?.p4;

  const activePlayers = Object.entries(players)?.filter(
    ([key, value]) => value?.id !== -1,
  );

  const barLabels = Object.values(Object.fromEntries(activePlayers))?.map(p =>
    firstSurname(p?.secondName),
  );

  const generateData = () => {
    let dataArray = [];
    barLabels.forEach((label, i) => {
      dataArray.push([
        winners?.[`p${i + 1}`] || null,
        errorForced?.[`p${i + 1}`] || null,
        nonForced?.[`p${i + 1}`] || null,
      ]);
    });
    return dataArray;
  };

  useEffect(() => {
    if (hasDataP1 || hasDataP2 || hasDataP3 || hasDataP4) {
      setData({
        labels: barLabels,
        legend: ['Win', 'EF', 'NF'],
        data: generateData(),
        barColors: ['#4caf50', '#2196f3', '#f44336'],
      });
    }
  }, [
    hasDataP1,
    hasDataP2,
    hasDataP3,
    hasDataP4,
    winners,
    errorForced,
    nonForced,
  ]);

  return {
    data,
  };
};
