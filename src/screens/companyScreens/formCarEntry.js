import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Input, Button} from 'react-native-elements';
import axios from '../../services/axios';
import {AuthContext} from '../../contexts/auth';
import IconIonicon from 'react-native-vector-icons/Ionicons';
import {showError} from '../../components/toast';

export default function FormCarEntryScreen({navigation}) {
  const {companyId} = useContext(AuthContext);
  const [placa, setPlaca] = useState('');
  const [prisma, setPrisma] = useState(0);

  const addCar = () => {
    axios
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
  };

  return (
    <View>
      <Input
        label="Placa"
        placeholder="Digite a placa do veículo"
        leftIcon={<Icon name="credit-card" size={24} color="black" />}
        onChangeText={(value) => setPlaca(value)}
      />
      <Input
        label="Prisma"
        placeholder="Número do prisma"
        leftIcon={
          <IconIonicon name="bookmark-outline" size={24} color="black" />
        }
        onChangeText={(value) => setPrisma(value)}
      />
      <Button
        icon={<IconIonicon name="checkbox-outline" size={15} color="green" />}
        title="Button with icon component"
        onPress={() => addCar()}
      />
    </View>
  );
}
