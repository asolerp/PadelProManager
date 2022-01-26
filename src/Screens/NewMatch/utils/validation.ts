import * as yup from 'yup';

export const newMatchValidationSchema = yup.object().shape({
  date: yup.string().required(),
  club: yup.string().min(2).required(),
  category: yup.string(),
  sex: yup.string().required(),
});
