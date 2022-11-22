import {format} from 'date-fns';
import {es} from 'date-fns/locale';

export const getDateAccounting = accountings => {
  const categories = accountings?.reduce((currentSpecs, accounting) => {
    const date = format(new Date(accounting.date), 'LLLL yyyy', {locale: es});

    if (!currentSpecs[date]) {
      return {...currentSpecs, [date]: [accounting]};
    }
    return {
      ...currentSpecs,
      [date]: [...currentSpecs[date], accounting],
    };
  }, {});

  return Object.keys(categories).map(category => ({
    title: category,
    data: categories[category],
  }));
};
