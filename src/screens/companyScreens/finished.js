import React, {useContext} from 'react';
import {View, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {GatewayContext} from '../../contexts/gateway';

export default function Finished() {
  const {finishedTransactions, getFinishedCars, loading} = useContext(
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
        onRefresh={getFinishedCars}
        data={finishedTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={ItemView}
      />
    </View>
  );
}
