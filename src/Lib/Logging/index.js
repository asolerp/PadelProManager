import {LOG_TYPES, TOAST_DURATION} from './constants';
import {
  init as initBugsnag,
  trackError as trackErrorBugsnag,
} from './providers/bugsnagProvider';
import {showToast} from './utils/showToast';

export {showToast, TOAST_DURATION, LOG_TYPES};

const isDevelopment = () => __DEV__;

export const info = ({title, subtitle, additionalData = ''}) => {
  if (isDevelopment()) {
    console.log(LOG_TYPES.info, title, subtitle, additionalData);
  }

  showToast({
    title,
    subtitle,
    type: 'info',
  });
};

export const error = ({title, subtitle, track = true, data}) => {
  if (isDevelopment()) {
    console.warn(LOG_TYPES.error, title, subtitle);
  }

  if (track) {
    trackErrorBugsnag({title, data});
  }

  showToast({
    title,
    subtitle,
    type: 'error',
  });
};

export const success = ({title, subtitle}) => {
  if (isDevelopment()) {
    console.log(LOG_TYPES.success, title, subtitle);
  }

  showToast({
    title,
    subtitle,
    type: 'success',
  });
};

export const warn = ({title, subtitle}) => {
  if (isDevelopment()) {
    console.log(LOG_TYPES.warn, title, subtitle);
  }

  showToast({
    title,
    subtitle,
    type: 'warning',
  });
};

export const trace = (title, subtitle) => {
  console.trace(LOG_TYPES.trace, title, subtitle);
};

const isProduction = !isDevelopment();

export const init = () => isProduction && initBugsnag();

export const setUser = () => {};
export const clearUser = () => {};
