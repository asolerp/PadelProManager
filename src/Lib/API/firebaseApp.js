import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';

export const CUSTOM_REGION = 'europe-west2';

export const defaultApp = firebase.app();

export const defaultFunctions = defaultApp.functions(CUSTOM_REGION);
