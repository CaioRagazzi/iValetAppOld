import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Divider, Card} from 'react-native-elements';
import axios from '../../services/axios';
import FloatingActionButton from '../../components/floatingActionButton';
import {format, subHours, differenceInMinutes, parseISO} from 'date-fns';
import {AuthContext} from '../../contexts/auth';
import {showWarning} from '../../components/toast';

export default function CarDetails({route, navigation}) {
  const {transactionParam} = route.params;
  const {companyId} = useContext(AuthContext);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({title: 'Detalhes'});
    setLoading(true);
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
          setLoading(false);
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
          } else if (!foundValue && res.data[0].maxPriceValue !== 0) {
            setPrice(res.data[0].maxPriceValue);
          }
        }
        setLoading(false);
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
    <SafeAreaView style={styles.mainContainer}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.titleTexts}>Placa</Card.Title>
        <Text style={styles.texts}>{transactionParam.placa.toUpperCase()}</Text>
      </Card>

      {transactionParam.prisma > 0 ? (
        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={styles.titleTexts}>Prisma</Card.Title>
          <Text style={styles.texts}>{transactionParam.prisma}</Text>
        </Card>
      ) : null}

      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.titleTexts}>Preço</Card.Title>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Text style={styles.texts}>{price}</Text>
        )}
      </Card>

      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.titleTexts}>Data de entrada</Card.Title>
        <Text style={styles.texts}>
          {format(parseISO(transactionParam.startDate), 'dd/MM/yyyy HH:mm:ss')}
        </Text>
      </Card>
      <FloatingActionButton text="Saída" onPress={() => handleBaixaVeiculo()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  texts: {
    fontSize: 26,
    fontWeight: '700',
  },
  titleTexts: {
    fontSize: 15,
    alignSelf: 'flex-start',
  },
  informationContainer: {
    marginBottom: 10,
  },
  divider: {
    backgroundColor: 'black',
    margin: 2,
  },
  cardContainer: {
    borderRadius: 10,
    margin: 6,
  },
});
