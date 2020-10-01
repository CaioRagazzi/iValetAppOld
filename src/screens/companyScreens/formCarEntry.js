import React, {useEffect} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Input} from 'react-native-elements';

export default function FormCarEntryScreen({navigation}) {
  useEffect(() => {
    navigation.setParams({title: 'teste'});
  }, [navigation]);
  return (
    <View>
      <Input
        label="Placa"
        placeholder="Digite a placa do veículo"
        leftIcon={<Icon name="credit-card" size={24} color="black" />}
      />
    </View>
  );
}
