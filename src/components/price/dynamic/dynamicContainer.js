import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PriceContext} from '../../../contexts/price';
import CheckBox from '@react-native-community/checkbox';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import InputTimeDynamic from './inputTimeDynamic';
import ButtonAddNewInputDynamic from './buttonAddNewInputDynamic';

export default function DynamicContainer() {
  const {
    isDynamicEnabled,
    hasMaxValue,
    setHasMaxValue,
    maxValue,
    setMaxValue,
  } = useContext(PriceContext);

  const dynamicContainer = () => {
    return isDynamicEnabled ? (
      <View>
        <View style={styles.containerMaxValue}>
          <CheckBox
            disabled={false}
            value={hasMaxValue}
            onValueChange={(inp) => setHasMaxValue(inp)}
          />
          <Text>Valor máximo</Text>
        </View>
        <View style={styles.subMainContainer}>
          {hasMaxValue ? (
            <Input
              labelStyle={{marginBottom: 15}}
              inputContainerStyle={styles.inputContainerMaxValue}
              leftIconContainerStyle={styles.inputIconContainerMaxValue}
              leftIcon={<Icon name="cash-outline" size={18} color="black" />}
              keyboardType="numeric"
              value={maxValue}
              onChangeText={(text) => setMaxValue(text)}
            />
          ) : null}
        </View>
      </View>
    ) : null;
  };

  return (
    <View>
      {dynamicContainer()}
      <InputTimeDynamic />
      <ButtonAddNewInputDynamic />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainerMaxValue: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: '50%',
  },
  inputIconContainerMaxValue: {
    paddingLeft: 10,
  },
  containerMaxValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
