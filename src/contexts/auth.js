import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../services/axios';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [authenticated, setauthenticated] = useState(false);
  const [logged, setLogged] = useState(false);
  const [type, setType] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const logIn = (username, password) => {
    setauthenticated(false);
    setLoading(true);
    axios
      .post('/auth', {
        username: username,
        password: password,
      })
      .then(async (res) => {
        if (res.data.access_token) {
          await AsyncStorage.setItem('access_token', res.data.access_token);
          setauthenticated(true);
          setLoading(false);
        }
      })
      .catch(() => {
        setauthenticated(false);
        setLoading(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  const logOut = async () => {
    await AsyncStorage.clear();
    setLoading(false);
    setauthenticated(false);
    setLogged(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        logIn,
        logOut,
        loading,
        error,
        setLogged,
        setType,
        type,
        logged,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
