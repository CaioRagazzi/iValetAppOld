import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

export default function Prices({navigation}) {
  useEffect(() => {
    navigation.setOptions({title: 'Preços'});
  }, [navigation]);
  return (
    <View>
      <Text>Prices</Text>
    </View>
  );
}
