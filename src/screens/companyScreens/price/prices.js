import React, {useEffect, useContext, useState, useCallback} from 'react';
import {View, FlatList} from 'react-native';
import HeaderPlusIcon from '../../../components/HeaderPlusIcon';
import axios from '../../../services/axios';
import {AuthContext} from '../../../contexts/auth';
import {ListItem} from 'react-native-elements';
import {PriceContext} from '../../../contexts/price';
import {showWarning} from '../../../components/toast';

export default function Prices({navigation}) {
  const {companyId} = useContext(AuthContext);
  const {populateFields} = useContext(PriceContext);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: 'Preços',
      headerRight: () => (
        <HeaderPlusIcon onPress={() => navigation.navigate('AddPrice')} />
      ),
    });

    getPrices();
  }, [navigation, companyId, getPrices]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPrices();
    });

    return unsubscribe;
  }, [navigation, getPrices]);

  const getPrices = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`price/${companyId}`)
      .then((res) => {
        setPrices(res.data);
        setLoading(false);
      })
      .catch(() => {
        showWarning('Erro buscando preços');
        setLoading(false);
      });
  }, [companyId]);

  const goToEditPrice = (price) => {
    populateFields(price);
    navigation.navigate('AddPrice', {edit: true});
  };

  const renderItem = ({item}) => (
    <ListItem bottomDivider onPress={() => goToEditPrice(item)}>
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
        refreshing={loading}
        onRefresh={() => getPrices()}
      />
    </View>
  );
}
