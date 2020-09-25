import React, {createContext, useState} from 'react';
import {AsyncStorage} from 'react-native';

import axios from '../services/axios';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const logIn = (username, password) => {
    setLoading(true);
    axios
      .post('/auth', {
        username: username,
        password: password,
      })
      .then(async (res) => {
        if (res.data.access_token) {
          await AsyncStorage.setItem('access_token', res.data.access_token);
        }
      })
      .catch(() => {
        setLoading(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  const logOut = () => {
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{loggedIn, logIn, logOut, loading, error}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
