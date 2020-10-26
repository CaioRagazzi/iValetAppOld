import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from '../../services/axios';
import FloatingActionButton from '../../components/floatingActionButton';
import {format} from 'date-fns';
import {AuthContext} from '../../contexts/auth';

export default function CarDetails({route, navigation}) {
  const {transactionParam} = route.params;
  const {companyId} = useContext(AuthContext);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    navigation.setOptions({title: transactionParam.placa.toUpperCase()});

    axios
      .get('price/week/day', {
        params: {
          weekday: format(new Date(), 'iiii').toString(),
          companyId: companyId,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data[0].type === 1) {
          setPrice(res.data[0].price);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    console.log(format(new Date(), 'iiii'));
  }, [navigation, transactionParam.placa, companyId]);

  const handleBaixaVeiculo = () => {
    axios
      .put('transaction/finish', null, {
        params: {
          transactionId: transactionParam.id,
          companyId: transactionParam.companyId,
        },
      })
      .then((res) => {
        navigation.popToTop();
        navigation.navigate('Saida');
      })
      .catch((err) => {});
  };

  return (
    <View style={styles.mainContainer}>
      <Text>Placa: {transactionParam.placa.toUpperCase()}</Text>
      <Text>Start Date: {transactionParam.startDate}</Text>
      {transactionParam.prisma > 0 ? (
        <Text>Placa: {transactionParam.prisma}</Text>
      ) : null}
      <Text>Preço: {price}</Text>
      <FloatingActionButton text="Saída" onPress={() => handleBaixaVeiculo()} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
