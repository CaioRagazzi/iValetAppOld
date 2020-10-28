import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from '../../services/axios';
import FloatingActionButton from '../../components/floatingActionButton';
import {format, subHours, differenceInMinutes, parseISO} from 'date-fns';
import {AuthContext} from '../../contexts/auth';
import {showWarning} from '../../components/toast';

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
        if (res.data.length === 0) {
          showWarning(
            'Nenhuma tabela de preço configurada para o dia de hoje!',
          );
          return;
        }
        if (res.data[0].type === 1) {
          setPrice(res.data[0].price);
        }
        if (res.data[0].type === 2) {
          const startDate = subHours(
            parseISO(transactionParam.startDate),
            new Date().getTimezoneOffset() / 60,
          );
          const currentDate = subHours(
            new Date(),
            new Date().getTimezoneOffset() / 60,
          );
          const difference = differenceInMinutes(currentDate, startDate);

          let foundValue = false;
          let sortedReturn = res.data.sort((a, b) => a.to > b.to);

          sortedReturn.map((priceMap) => {
            if (difference >= priceMap.to && difference <= priceMap.from) {
              setPrice(priceMap.price);
              foundValue = true;
            }
          });

          if (!foundValue && res.data[0].maxPriceValue === 0) {
            let maxPrice = sortedReturn[sortedReturn.length - 1].price;
            setPrice(maxPrice);
          } else {
            setPrice(res.data[0].maxPriceValue);
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err);
      });
  }, [navigation, transactionParam.placa, companyId, transactionParam]);

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
      <Text>
        Start Date:{' '}
        {format(parseISO(transactionParam.startDate), 'dd/MM/yyyy HH:mm:ss')}
      </Text>
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
