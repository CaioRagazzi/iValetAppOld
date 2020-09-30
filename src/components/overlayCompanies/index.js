import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {Overlay} from 'react-native-elements';
import axios from '../../services/axios';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';

export default function OverlayCompanies(props) {
  const [visible, setVisible] = useState(false);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getUserCompanies = async () => {
      const token = await AsyncStorage.getItem('access_token');
      var decodedToken = jwt_decode(token);

      axios
        .get(`user/${decodedToken.id}`)
        .then((res) => {
          console.log(res.data);
          setCompanies(res.data.company);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUserCompanies();
  }, []);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const itemList = ({item}) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <Overlay isVisible={visible} overlayStyle={styles.overlayContainer}>
      <View>
        <View style={styles.title}>
          <Text>Selecione o Estaciomanento</Text>
        </View>
        <FlatList
          data={companies}
          renderItem={itemList}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    width: '70%',
    height: '80%',
    borderRadius: 30,
    margin: 0,
    padding: 0,
  },
  title: {
    height: '30%',
    backgroundColor: '#00FFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
