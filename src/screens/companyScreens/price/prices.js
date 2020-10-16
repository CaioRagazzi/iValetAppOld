import React, {useEffect, useContext, useState} from 'react';
import {View, FlatList} from 'react-native';
import HeaderPlusIcon from '../../../components/HeaderPlusIcon';
import axios from '../../../services/axios';
import {AuthContext} from '../../../contexts/auth';
import {ListItem} from 'react-native-elements';

export default function Prices({navigation}) {
  const {companyId} = useContext(AuthContext);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Preços',
      headerRight: () => (
        <HeaderPlusIcon onPress={() => navigation.navigate('AddPrice')} />
      ),
    });

    axios
      .get(`price/${companyId}`)
      .then((res) => {
        setPrices(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [navigation, companyId]);

  const renderItem = ({item}) => (
    <ListItem
      bottomDivider
      onPress={() => navigation.navigate('AddPrice', item)}>
      <ListItem.Content>
        <ListItem.Title>{getWeekDays(item.weekDay)}</ListItem.Title>
        <ListItem.Subtitle>
          {item.type === 1 ? 'Fixo' : 'Dinâmico'}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  const getWeekDays = (weekDays) => {
    const splited = weekDays.split('|');

    let returnString = '';
    splited.map((item) => {
      switch (item) {
        case 'M':
          returnString += 'Segunda | ';
          break;
        case 'TU':
          returnString += 'Terça | ';
          break;
        case 'W':
          returnString += 'Quarta | ';
          break;
        case 'TH':
          returnString += 'Quinta | ';
          break;
        case 'F':
          returnString += 'Sexta | ';
          break;
        case 'SA':
          returnString += 'Sábado | ';
          break;
        case 'SU':
          returnString += 'Domingo | ';
          break;
      }
    });

    return returnString;
  };

  return (
    <View>
      <FlatList
        data={prices}
        renderItem={renderItem}
        keyExtractor={(item) => item.uniqueIdPrice}
      />
    </View>
  );
}
