import React, {useEffect, useContext, useState} from 'react';
import {View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import {AuthContext} from '../../contexts/auth';

import OverlayCompanies from '../../components/overlayCompanies/index';

export default function LoadingScreen() {
  const [overlayVisible, setOverlayVisible] = useState(true);
  const {setLogged, setType} = useContext(AuthContext);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('access_token');
      var decodedToken = jwt_decode(token);
      if (decodedToken.idPerfil === 1) {
        setOverlayVisible(true);
        // setType(1);
      } else {
        setType(2);
        setLogged(true);
      }
    };

    getToken();
  }, [setType, setLogged]);

  return (
    <View style={styles.viewContainer}>
      <ScrollView
        contentContainerStyle={styles.mainContainer}
        keyboardShouldPersistTaps="handled">
        <OverlayCompanies visible={overlayVisible} />
        <ActivityIndicator size="large" color="black" />
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
  subMainContainer: {
    padding: 15,
  },
  cardTitle: {
    textAlignVertical: 'center',
    color: 'white',
    backgroundColor: '#2288dd',
    fontSize: 26,
    height: 50,
  },
  cardContainer: {
    padding: 0,
  },
});
