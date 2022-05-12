import firebase from '@react-native-firebase/app';

const CUSTOM_REGION = 'europe-west2';

export const defaultApp = firebase.app();

export const defaultFunctions = defaultApp.functions(CUSTOM_REGION);
