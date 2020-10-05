import React, {useContext} from 'react';
import {View, FlatList} from 'react-native';
import {GatewayContext} from '../../contexts/gateway';
import CardCar from '../../components/cardCar';

export default function Entry({navigation}) {
  const {openedTransactions, getOpenedCars, loading} = useContext(
    GatewayContext,
  );

  return (
    <View>
      <FlatList
        refreshing={loading}
        onRefresh={getOpenedCars}
        data={openedTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <CardCar
            data={item}
            onPress={() =>
              navigation.navigate('Details', {transactionParam: item})
            }
          />
        )}
      />
    </View>
  );
}
