import React, {useContext} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import InputFixedPrice from './inputFixedPrice';
import {PriceContext} from '../../../contexts/price';

export default function FixedContainer() {
  const {isFixedEnabled, handleSwitches} = useContext(PriceContext);

  return (
    <View>
      <View style={styles.containerTexts}>
        <Text style={styles.text}>Valor Fixo: </Text>
        <Switch
          trackColor={{false: '#767577', true: '#9E8170'}}
          thumbColor={isFixedEnabled ? '#832D25' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => handleSwitches('fixed')}
          value={isFixedEnabled}
        />
      </View>
      <InputFixedPrice />
    </View>
  );
}

const styles = StyleSheet.create({
  containerTexts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
