import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Input, Card} from 'react-native-elements';
import axios from '../../services/axios';
import {AuthContext} from '../../contexts/auth';
import IconIonicon from 'react-native-vector-icons/Ionicons';
import {showError} from '../../components/toast';
import SaveIcon from '../../components/saveIcon';
import {HeaderBackButton} from '@react-navigation/stack';
import OverlayLoading from '../../components/overlayLoading';

export default function FormCarEntryScreen({navigation}) {
  const {companyId} = useContext(AuthContext);
  const [placa, setPlaca] = useState('');
  const [prisma, setPrisma] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const addCar = async () => {
      Keyboard.dismiss();
      setLoading(true);
      await axios
        .post('transaction', {
          placa,
          companyId,
          prismaNumber: +prisma,
        })
        .then((res) => {
          navigation.popToTop();
          navigation.navigate('Entrada');
        })
        .catch((err) => {
          if (err.response.data.message === 'Cars already in') {
            showError('Carro já se encontra no estacionamento!');
          }
        });
      setLoading(false);
    };

    navigation.setOptions({
      title: 'Preço',
      headerRight: () => <SaveIcon onPress={() => addCar()} />,
      headerLeft: () => (
        <HeaderBackButton
          tintColor="#ffffff"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation, companyId, placa, prisma]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Card containerStyle={styles.cardDateContainer}>
          <Card.Title>Placa</Card.Title>
          <Input
            placeholder="Digite a placa do veículo"
            leftIcon={<Icon name="credit-card" size={24} color="black" />}
            onChangeText={(value) => setPlaca(value)}
          />
        </Card>
        <Card containerStyle={styles.cardPrismaContainer}>
          <Card.Title>Prisma</Card.Title>
          <Input
            leftIcon={
              <IconIonicon name="bookmark-outline" size={24} color="black" />
            }
            onChangeText={(value) => setPrisma(value)}
          />
        </Card>
      </ScrollView>
      <OverlayLoading isLoading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardDateContainer: {
    borderRadius: 20,
    elevation: 5,
  },
  cardPrismaContainer: {
    width: '50%',
    borderRadius: 20,
    elevation: 5,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
