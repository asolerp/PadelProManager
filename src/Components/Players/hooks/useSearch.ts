import {useState} from 'react';
import {removeAccents} from '../../../Utils/removeAccents';

export const useSearch = ({list}) => {
  const [search, setSearch] = useState();

  const getFormatedName = p =>
    removeAccents(`${p.firstName} ${p.secondName}`).toLowerCase();

  const formatedSearch = search && removeAccents(search).toLowerCase();

  const sortByName = (x, y) => {
    return x.firstName.localeCompare(y.firstName, 'es', {
      ignorePunctuation: true,
    });
  };

  const filteredList = !search
    ? list?.sort(sortByName)
    : list
        ?.sort(sortByName)
        ?.filter(p => getFormatedName(p).includes(formatedSearch));

  return {
    search,
    setSearch,
    filteredList,
  };
};
