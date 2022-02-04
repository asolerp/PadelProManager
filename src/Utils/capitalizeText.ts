import {capitalize} from './parsers';

export const capitalizeText = text => {
  const splitedText = text.split(' ');
  let result = '';

  splitedText.forEach(word => {
    result += capitalize(word) + ' ';
  });

  return result;
};
