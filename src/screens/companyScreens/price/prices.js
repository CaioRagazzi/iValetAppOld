import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import HeaderPlusIcon from '../../../components/HeaderPlusIcon';

export default function Prices({navigation}) {
  useEffect(() => {
    navigation.setOptions({
      title: 'Preços',
      headerRight: () => (
        <HeaderPlusIcon onPress={() => navigation.navigate('AddPrice')} />
      ),
    });
  }, [navigation]);
  return (
    <View>
      <Text>Prices</Text>
    </View>
  );
}
