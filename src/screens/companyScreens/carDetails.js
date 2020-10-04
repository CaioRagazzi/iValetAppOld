import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

export default function CarDetails({route}) {
  useEffect(() => {
    const {car} = route.params;
    console.log(car);
  }, []);
  return (
    <View>
      <Text>Detalhes</Text>
    </View>
  );
}
