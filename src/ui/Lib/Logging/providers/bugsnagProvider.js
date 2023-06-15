/* eslint-disable immutable/no-mutation */
import Bugsnag from '@bugsnag/react-native';

import packageJSON from '../../../../../package.json';

// eslint-disable-next-line no-unused-vars, immutable/no-let
let isBugsnagInitialised = false;

const getCustomData = () => {
  try {
    return {
      country: 'es',
      appVersion: packageJSON.version,
    };
  } catch (e) {
    console.error('Unable to generate Bugsnag customData');
  }
};

export const init = () => {
  try {
    if (isBugsnagInitialised) {
      return;
    }
    const customData = getCustomData();
    Bugsnag.start({
      metadata: {
        customData,
      },
    });
    isBugsnagInitialised = true;
  } catch (e) {
    console.error('Unable to initialise Bugsnag');
    throw new Error(e);
  }
};

export const trackError = ({message, data}) => {
  if (!isBugsnagInitialised) {
    init();
  }
  Bugsnag.notify(new Error(message), event => {
    event.addMetadata('customData', {
      ...getCustomData(),
      extraData: JSON.stringify(data),
    });
  });
};
