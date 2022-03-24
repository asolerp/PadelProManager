import remoteConfig from '@react-native-firebase/remote-config';

import {REGISTRY} from './registry';
import {compareToggleValues, getDefaultValues} from './utils';
export {REGISTRY};
import {isDevelopment} from '../../Utils/isDevelopment';

export const initRemoteConfig = async () => {
  try {
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 60000,
    });

    await remoteConfig().setDefaults({
      ...getDefaultValues(REGISTRY),
    });

    return await remoteConfig().fetchAndActivate();
  } catch (e) {
    console.log(e);
  }
};

export const isFeatureEnabled = registry => {
  try {
    const {key, debug} = registry;
    const configValue = remoteConfig().getValue(key);

    if (isDevelopment() && debug !== undefined) {
      return debug;
    }

    return compareToggleValues(configValue.asString(), '1');
  } catch (e) {
    console.log(e);
  }

  return false;
};

export const isFeatureAppUpdateRequired = registry => {
  try {
    const {key} = registry;
    const configValue = remoteConfig().getValue(key);

    return compareToggleValues(configValue.asString(), 'update');
  } catch (e) {
    console.log(e);
  }
};

export const getFeatureConfig = registry => {
  try {
    const {key} = registry;
    const configValue = remoteConfig().getValue(key).asString();

    if (!configValue) {
      return {};
    }

    return JSON.parse(configValue);
  } catch (e) {
    console.log(e);
  }

  return {};
};
