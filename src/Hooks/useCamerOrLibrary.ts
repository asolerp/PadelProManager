import {useCallback, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const useCameraOrLibrary = () => {
  const [response, setResponse] = useState<any>(null);

  const onImagePress = useCallback(({type, options}) => {
    if (type === 'capture') {
      launchCamera(options, setResponse);
    } else {
      launchImageLibrary(options, setResponse);
    }
  }, []);

  return {
    onImagePress,
    response,
  };
};
