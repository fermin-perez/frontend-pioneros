import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import pionerosApi from '../api/pionerosApi';
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from '../store/auth/authSlice';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await pionerosApi.post('/auth/login', {
        email,
        password,
      });
      await AsyncStorage.setItem('token', data.token);
      dispatch(onLogin(data.user));
    } catch (error) {
      const errors =
        error.response.data?.msg ||
        Object.values(error.response.data.errors)[0].msg;
      dispatch(onLogout(errors));
      setTimeout(() => dispatch(clearErrorMessage()), 100);
    }
  };

  const startLogout = async () => {
    await AsyncStorage.clear();
    dispatch(onLogout());
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await pionerosApi.post('/auth/register', {
        name,
        email,
        password,
      });
      await AsyncStorage.setItem('token', data.token);
      dispatch(onLogin(data.user));
    } catch (error) {
      const errors =
        error.response.data?.msg ||
        Object.values(error.response.data.errors)[0].msg;
      dispatch(onLogout(errors));
      setTimeout(() => dispatch(clearErrorMessage()), 10);
    }
  };

  const checkAuthToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return dispatch(onLogout());
    try {
      const { data } = await pionerosApi.get('/auth/renew');
      await AsyncStorage.setItem('token', data.token);
      dispatch(onLogin(data.user));
    } catch (error) {
      await AsyncStorage.clear();
      dispatch(onLogout());
    }
  };

  return {
    //* Propiedades
    status,
    user,
    errorMessage,

    //* Métodos
    startLogin,
    startLogout,
    startRegister,
    checkAuthToken,
  };
};
