import React, {useContext} from 'react';
import {View, FlatList} from 'react-native';
import {GatewayContext} from '../../contexts/gateway';
import {ListItem} from 'react-native-elements';
import IconIonicons from 'react-native-vector-icons/Ionicons';

export default function Entry() {
  const {openedTransactions, getOpenedCars, loading} = useContext(
    GatewayContext,
  );

  const ItemView = ({item}) => {
    return (
      <ListItem key={item.id} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.placa}</ListItem.Title>
          <ListItem.Subtitle>Subtitle</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron>
          <IconIonicons name="chevron-forward-outline" />
        </ListItem.Chevron>
      </ListItem>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        refreshing={loading}
        onRefresh={getOpenedCars}
        data={openedTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={ItemView}
      />
    </View>
  );
}
