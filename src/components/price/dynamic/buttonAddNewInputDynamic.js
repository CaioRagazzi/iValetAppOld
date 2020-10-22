import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {PriceContext} from '../../../contexts/price';
import Icon from 'react-native-vector-icons/Ionicons';
import {format} from 'date-fns';

export default function ButtonAddNewInputDynamic() {
  const {isDynamicEnabled, setQuantityDynamic} = useContext(PriceContext);

  return isDynamicEnabled ? (
    <TouchableOpacity
      style={styles.addButton}
      onPress={() =>
        setQuantityDynamic((previousState) => [
          ...previousState,
          {id: previousState[0].uniqueIdPrice},
        ])
      }>
      <Icon name="add-circle-outline" size={22} color="#41484F" />
    </TouchableOpacity>
  ) : null;
}

const styles = StyleSheet.create({
  addButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
});
