import {ToastAndroid} from 'react-native';

export const showWarning = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

export const showError = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};
