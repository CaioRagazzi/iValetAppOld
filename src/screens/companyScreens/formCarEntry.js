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

  const addCar = () => {
    axios
      .post('transaction', {
        placa,
        companyId,
      })
      .then((res) => {
        navigation.popToTop();
        navigation.navigate('Entrada');
      })
      .catch((err) => {
        if (err.response.data.errno === 1062) {
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
      <Button
        icon={<IconIonicon name="checkbox-outline" size={15} color="green" />}
        title="Button with icon component"
        onPress={() => addCar()}
      />
    </View>
  );
}
