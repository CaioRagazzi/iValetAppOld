import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from '../../services/axios';
import FloatingActionButton from '../../components/floatingActionButton';

export default function CarDetails({route, navigation}) {
  const {transactionParam} = route.params;

  useEffect(() => {
    navigation.setOptions({title: transactionParam.placa});
  }, [navigation, transactionParam.placa]);

  const handleBaixaVeiculo = () => {
    axios
      .put('transaction/finish', null, {
        params: {
          transactionId: transactionParam.id,
          companyId: transactionParam.companyId,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigation.popToTop();
        navigation.navigate('Saida');
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <Text>Placa: {transactionParam.placa}</Text>
      <Text>Placa: {transactionParam.startDate}</Text>
      {transactionParam.prisma > 0 ? (
        <Text>Placa: {transactionParam.prisma}</Text>
      ) : null}
      <FloatingActionButton text="Saída" onPress={() => handleBaixaVeiculo()} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
