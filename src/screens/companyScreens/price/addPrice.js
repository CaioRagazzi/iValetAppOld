import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Divider, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import DateButtonsCalendar from '../../../components/dateButtonsCalendar';
import InputTimer from '../../../components/inputTimer';
import {format} from 'date-fns';
import SaveIcon from '../../../components/saveIcon';
import {AuthContext} from '../../../contexts/auth';
import axios from '../../../services/axios';
import {showWarning} from '../../../components/toast';

export default function AddPrice({navigation}) {
  const {companyId} = useContext(AuthContext);
  const [isFixedEnabled, setIsFixedEnabled] = useState(true);
  const [isDynamicEnabled, setIsDynamicEnabled] = useState(false);
  const [quantityDynamic, setQuantityDynamic] = useState([
    {id: format(new Date(), 'HHmmssSSS'), start: '', end: '', price: ''},
  ]);
  const [typePrice, setTypePrice] = useState(1);
  const [selectedWeekDays, setSelectedWeekDays] = useState('');
  const [fixedValue, setfixedValue] = useState('');

  useEffect(() => {
    const save = () => {
      if (!selectedWeekDays) {
        showWarning('Favor preencher pelo menos um dia da semana');
        return;
      }
      if (typePrice === 1) {
        let uniqueIdPrice = format(new Date(), 'HHmmssSSS');
        if (!fixedValue) {
          showWarning('Favor preencher o campo valor');
          return;
        }
        axios
          .post('price', {
            type: 1,
            weekDay: selectedWeekDays,
            companyId,
            price: +fixedValue,
            uniqueIdPrice: uniqueIdPrice,
          })
          .then((res) => {})
          .catch((err) => {});
      } else {
        quantityDynamic.map((item) => {
          if (!item.start || !item.end || !item.price) {
            showWarning('Favor preencher todos os campos!');
            return;
          }
        });
        let uniqueIdPrice = format(new Date(), 'HHmmssSSS');
        quantityDynamic.map((item) => {
          axios
            .post('price', {
              type: 2,
              to: +item.start,
              from: +item.end,
              weekDay: selectedWeekDays,
              companyId,
              price: +item.price,
              uniqueIdPrice: uniqueIdPrice,
            })
            .then((res) => {})
            .catch((err) => {});
        });
      }
    };
    navigation.setOptions({
      title: 'Home',
      headerRight: () => (
        <TouchableOpacity>
          <SaveIcon onPress={() => save()} />
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    quantityDynamic,
    selectedWeekDays,
    typePrice,
    companyId,
    fixedValue,
  ]);

  const handleSwitches = (type) => {
    if (type === 'fixed') {
      setTypePrice(1);
      if (!isFixedEnabled && isDynamicEnabled) {
        setIsDynamicEnabled(false);
      }
      setIsFixedEnabled((previousState) => !previousState);
    } else {
      setTypePrice(2);
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
          label="Valor"
          inputContainerStyle={styles.inputContainerFixed}
          leftIconContainerStyle={styles.inputIconContainerFixed}
          leftIcon={<Icon name="cash-outline" size={24} color="black" />}
          value={fixedValue}
          onChangeText={(text) => setfixedValue(text)}
        />
      </View>
    ) : null;
  };

  const removeSpecificItem = (itemId) => {
    const newArray = quantityDynamic.filter((item) => {
      return itemId !== item.id;
    });
    setQuantityDynamic(newArray);
  };

  const getInputValue = (item) => {
    const resultItem = quantityDynamic.find(
      (element) => element.id === item.id,
    );
    return resultItem;
  };

  const setStartInputValue = (item, value) => {
    const newArray = [...quantityDynamic];
    newArray.forEach((element) => {
      if (element.id === item.id) {
        element.start = value;
      }
    });

    setQuantityDynamic(newArray);
  };

  const setEndInputValue = (item, value) => {
    const newArray = [...quantityDynamic];
    newArray.forEach((element) => {
      if (element.id === item.id) {
        element.end = value;
      }
    });

    setQuantityDynamic(newArray);
  };

  const setPriceInputValue = (item, value) => {
    const newArray = [...quantityDynamic];
    newArray.forEach((element) => {
      if (element.id === item.id) {
        element.price = value;
      }
    });

    setQuantityDynamic(newArray);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} scrollEnabled={true}>
        <DateButtonsCalendar
          OnWeekDayChange={(weekDays) => setSelectedWeekDays(weekDays)}
        />
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
          ? quantityDynamic.map((item) => (
              <InputTimer
                startValue={getInputValue(item).start}
                onStartChangeText={(value) => setStartInputValue(item, value)}
                endValue={getInputValue(item).end}
                onEndChangeText={(value) => setEndInputValue(item, value)}
                priceValue={getInputValue(item).price}
                onPriceChangeText={(value) => setPriceInputValue(item, value)}
                key={item.id}
                removeItem={() => removeSpecificItem(item.id)}
              />
            ))
          : null}
        {isDynamicEnabled ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              setQuantityDynamic((previousState) => [
                ...previousState,
                {id: format(new Date(), 'HHmmssSSS')},
              ])
            }>
            <Icon name="add-circle-outline" size={22} color="#41484F" />
          </TouchableOpacity>
        ) : null}
      </ScrollView>
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
  addButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
});
