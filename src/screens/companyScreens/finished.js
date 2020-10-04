import React, {useContext} from 'react';
import {View, FlatList} from 'react-native';
import {GatewayContext} from '../../contexts/gateway';
import CardCar from '../../components/cardCar';

export default function Finished() {
  const {finishedTransactions, getFinishedCars, loading} = useContext(
    GatewayContext,
  );

  return (
    <View>
      <FlatList
        refreshing={loading}
        onRefresh={getFinishedCars}
        data={finishedTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <CardCar data={item} />}
      />
    </View>
  );
}
