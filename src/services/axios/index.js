import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://ragazzitech.caioragazzi.com:81/',
});

export default instance;
