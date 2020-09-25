import {ToastAndroid} from 'react-native';

export const showWarning = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};
