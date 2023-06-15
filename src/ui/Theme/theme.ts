// theme.jsx
import {StyleSheet} from 'react-native';
import {createTheme} from 'react-native-whirlwind';

// Wrap your new styles in a `StyleSheet.create` to avoid recreation on every render
const t = StyleSheet.create({
  // Define your theme as usual but note the spread operator
  ...createTheme({
    colors: {
      primary: '#3f51b5',
      secondary: '#f50057',
      successContrast: '#4caf5040',
    },
  }),
  shadow: {
    shadowColor: '#4f4f4f',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default t;
