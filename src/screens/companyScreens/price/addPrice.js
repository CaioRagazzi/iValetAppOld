import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Divider, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import DateButtonsCalendar from '../../../components/dateButtonsCalendar';
import OverlaySelectTime from '../../../components/overlaySelectTime';

export default function AddPrice() {
  const [isFixedEnabled, setIsFixedEnabled] = useState(false);
  const [isDynamicEnabled, setIsDynamicEnabled] = useState(false);
  const [quantityDynamic, setQuantityDynamic] = useState(['1']);

  const handleSwitches = (type) => {
    if (type === 'fixed') {
      if (!isFixedEnabled && isDynamicEnabled) {
        setIsDynamicEnabled(false);
      }
      setIsFixedEnabled((previousState) => !previousState);
    } else {
      if (!isDynamicEnabled && isFixedEnabled) {
        setIsFixedEnabled(false);
      }
      setIsDynamicEnabled((previousState) => !previousState);
    }
  };

  const inputFixedPrice = () => {
    return isFixedEnabled ? (
      <View style={styles.inputMainContainerFixed}>
        <Input
          inputContainerStyle={styles.inputContainerFixed}
          leftIconContainerStyle={styles.inputIconContainerFixed}
          leftIcon={<Icon name="cash-outline" size={24} color="black" />}
        />
      </View>
    ) : null;
  };
  const inputDynamicPrice = (item, idx) => {
    return (
      <View key={idx} style={styles.inputMainContainerDynamic}>
        <View style={{width: '30%'}}>
          <Text style={{paddingLeft: 10}}>De:</Text>
          <Input
            inputContainerStyle={styles.inputContainerDynamic}
            leftIconContainerStyle={styles.inputIconContainerDynamic}
            leftIcon={<Icon name="time-outline" size={18} color="black" />}
          />
        </View>
        <View style={{width: '30%'}}>
          <Text style={{paddingLeft: 10}}>Até:</Text>
          <Input
            inputContainerStyle={styles.inputContainerDynamic}
            leftIconContainerStyle={styles.inputIconContainerDynamic}
            leftIcon={<Icon name="time-outline" size={18} color="black" />}
          />
        </View>
        <View style={{width: '30%'}}>
          <Text style={{paddingLeft: 10}}>Preço:</Text>
          <Input
            inputContainerStyle={styles.inputContainerDynamic}
            leftIconContainerStyle={styles.inputIconContainerDynamic}
            leftIcon={<Icon name="cash-outline" size={18} color="black" />}
          />
        </View>
        <TouchableOpacity
          onPress={() => removeSpecificItem(idx)}
          style={{justifyContent: 'center', alignSelf: 'center'}}>
          <Icon name="remove-circle-outline" size={22} color="#9E8170" />
        </TouchableOpacity>
      </View>
    );
  };

  const removeSpecificItem = (idx) => {
    setQuantityDynamic(quantityDynamic.filter((item, idxF) => idx !== idxF));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <DateButtonsCalendar />
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
      {inputFixedPrice()}
      <Divider style={styles.divider} />
      <View style={styles.containerTexts}>
        <Text style={styles.text}>Valor Dinâmico: </Text>
        <Switch
          trackColor={{false: '#767577', true: '#9E8170'}}
          thumbColor={isDynamicEnabled ? '#832D25' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => handleSwitches('dynamic')}
          value={isDynamicEnabled}
        />
      </View>
      {isDynamicEnabled
        ? quantityDynamic.map((item, idx) => inputDynamicPrice(item, idx))
        : null}
      {isDynamicEnabled ? (
        <TouchableOpacity
          style={{justifyContent: 'center', alignSelf: 'center'}}
          onPress={() =>
            setQuantityDynamic((previousState) => [...previousState, ''])
          }>
          <Icon name="add-circle-outline" size={22} color="#41484F" />
        </TouchableOpacity>
      ) : null}

      {/* <OverlaySelectTime visible={true} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  containerTexts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#41484F',
    marginVertical: 10,
  },
  inputContainerFixed: {
    borderWidth: 1,
    borderRadius: 5,
  },
  inputMainContainerFixed: {
    marginTop: 10,
  },
  inputIconContainerFixed: {
    paddingLeft: 10,
  },
  inputContainerDynamic: {
    borderWidth: 1,
    borderRadius: 5,
  },
  inputMainContainerDynamic: {
    flexDirection: 'row',
    marginTop: 10,
  },
  inputIconContainerDynamic: {
    paddingLeft: 10,
  },
});
