import React, {useContext, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {GatewayContext} from '../../contexts/gateway';
import CardCar from '../../components/cardCar';
import OpenDrawerIcon from '../../components/openDrawerIcon';

export default function Entry({navigation}) {
  const {openedTransactions, getOpenedCars, loading} = useContext(
    GatewayContext,
  );

  useEffect(() => {
    navigation.setOptions({
      title: 'Entrada',
      headerLeft: () => (
        <OpenDrawerIcon onPress={() => navigation.toggleDrawer()} />
      ),
    });
  }, [navigation]);

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
