import React, {useEffect, useContext} from 'react';
import {View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';

import {AuthContext} from '../../contexts/auth';

export default function LoadingScreen() {
  const {setLogged, setType, setSplash} = useContext(AuthContext);
  useEffect(() => {
    setTimeout(() => {
      const getToken = async () => {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
          setType(0);
          setLogged(false);
        } else {
          var decodedToken = jwt_decode(token);
          if (decodedToken.idPerfil === 1) {
            const company = await AsyncStorage.getItem('company');
            if (company) {
              setType(1);
              setLogged(true);
            }
          } else {
            setType(2);
            setLogged(true);
          }
        }
        setSplash(false);
      };
      getToken();
    }, 2500);
  }, [setLogged, setSplash, setType]);
  return (
    <View style={styles.viewContainer}>
      <ScrollView
        contentContainerStyle={styles.mainContainer}
        keyboardShouldPersistTaps="handled">
        <ActivityIndicator size="large" color="#9E8170" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  mainContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
