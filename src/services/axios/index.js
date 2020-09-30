import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
  baseURL: 'http://ragazzitech.caioragazzi.com:81/',
});

instance.interceptors.request.use(
  async function (config) {
    if (!config.url.endsWith('auth')) {
      const token = await AsyncStorage.getItem('access_token');
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  },
);

export default instance;
