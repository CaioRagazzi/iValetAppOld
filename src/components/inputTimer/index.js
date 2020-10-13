import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Input} from 'react-native-elements';

export default function InputTimer(props) {
  const [values, setValues] = useState({start: '', end: '', price: ''});
  return (
    <View style={styles.inputMainContainerDynamic}>
      <View style={styles.subMainContainer}>
        <Input
          label="Início minutos:"
          inputContainerStyle={styles.inputContainerDynamic}
          leftIconContainerStyle={styles.inputIconContainerDynamic}
          leftIcon={<Icon name="time-outline" size={18} color="black" />}
          keyboardType="numeric"
          value={props.startValue}
          onChangeText={(text) => props.onStartChangeText(text)}
        />
      </View>
      <View style={styles.subMainContainer}>
        <Input
          label="Final minutos:"
          inputContainerStyle={styles.inputContainerDynamic}
          leftIconContainerStyle={styles.inputIconContainerDynamic}
          leftIcon={<Icon name="time-outline" size={18} color="black" />}
          keyboardType="numeric"
          value={props.endValue}
          onChangeText={(text) => props.onEndChangeText(text)}
        />
      </View>
      <View style={styles.subMainContainer}>
        <Input
          labelStyle={{marginBottom: 15}}
          label="Preço"
          inputContainerStyle={styles.inputContainerDynamic}
          leftIconContainerStyle={styles.inputIconContainerDynamic}
          leftIcon={<Icon name="cash-outline" size={18} color="black" />}
          keyboardType="numeric"
          value={props.priceValue}
          onChangeText={(text) => props.onPriceChangeText(text)}
        />
      </View>
      <TouchableOpacity
        onPress={() => props.removeItem()}
        style={styles.removeButton}>
        <Icon name="remove-circle-outline" size={22} color="#9E8170" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputMainContainerDynamic: {
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    paddingLeft: 10,
  },
  inputContainerDynamic: {
    borderWidth: 1,
    borderRadius: 5,
  },
  inputIconContainerDynamic: {
    paddingLeft: 10,
  },
  subMainContainer: {
    width: '30%',
  },
  removeButton: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
