import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const pionerosApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

pionerosApi.interceptors.request.use(async (config) => {
  config.headers = {
    ...config.headers,
    'x-token': await AsyncStorage.getItem('token'),
  };

  return config;
});

export default pionerosApi;
