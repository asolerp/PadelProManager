import Bugsnag from '@bugsnag/react-native';
import 'react-native-gesture-handler';
Bugsnag.start();

/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['Require cycle: node_modules/victory']);

AppRegistry.registerComponent(appName, () => App);
