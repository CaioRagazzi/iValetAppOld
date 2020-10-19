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
import {PriceContext} from '../../../contexts/price';
import {showWarning} from '../../../components/toast';
import {HeaderBackButton} from '@react-navigation/stack';
import CheckBox from '@react-native-community/checkbox';

export default function AddPrice({navigation, route}) {
  const {
    fixedValue,
    setfixedValue,
    cleanFields,
    isFixedEnabled,
    setIsFixedEnabled,
    isDynamicEnabled,
    setIsDynamicEnabled,
    quantityDynamic,
    setQuantityDynamic,
    createFixedPrice,
    createDynamicPrice,
    hasMaxValue,
    setHasMaxValue,
    maxValue,
    setMaxValue,
  } = useContext(PriceContext);

  const [typePrice, setTypePrice] = useState(1);
  const [selectedWeekDays, setSelectedWeekDays] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (route.params) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
    const save = async () => {
      if (!selectedWeekDays) {
        showWarning('Favor preencher pelo menos um dia da semana');
        return;
      }
      let created = false;
      if (typePrice === 1 && !isEdit) {
        if (!fixedValue) {
          showWarning('Favor preencher o campo valor');
          return;
        }
        await createFixedPrice(selectedWeekDays).then((res) => {
          created = res;
        });
        if (!created) {
          return;
        }
        navigation.goBack();
        cleanFields();
      } else {
        let isFieldsInvalid = false;
        if (hasMaxValue && maxValue === '') {
          showWarning('Favor preencher o campo valor máximo!');
          isFieldsInvalid = true;
        }
        quantityDynamic.map((item) => {
          if (!item.start || !item.end || !item.price) {
            showWarning('Favor preencher todos os campos!');
            isFieldsInvalid = true;
          }
        });
        if (isFieldsInvalid) {
          return;
        }
        await createDynamicPrice(selectedWeekDays, hasMaxValue, maxValue).then(
          (res) => {
            created = res;
          },
        );
        if (!created) {
          return;
        }
        navigation.goBack();
        cleanFields();
      }
    };
    navigation.setOptions({
      title: 'Home',
      headerRight: () => (
        <TouchableOpacity>
          <SaveIcon onPress={() => save()} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            navigation.goBack();
            cleanFields();
          }}
        />
      ),
    });
  }, [
    navigation,
    quantityDynamic,
    selectedWeekDays,
    typePrice,
    fixedValue,
    route.params,
    cleanFields,
    setQuantityDynamic,
    isEdit,
    createDynamicPrice,
    createFixedPrice,
    hasMaxValue,
    maxValue,
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
      if (quantityDynamic.length === 0) {
        setQuantityDynamic([
          {
            id: format(new Date(), 'HHmmssSSS'),
            start: '',
            end: '',
            price: '',
          },
        ]);
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
          keyboardType="number-pad"
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
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled">
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
        {isDynamicEnabled ? (
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
                  leftIcon={
                    <Icon name="cash-outline" size={18} color="black" />
                  }
                  keyboardType="numeric"
                  value={maxValue}
                  onChangeText={(text) => setMaxValue(text)}
                />
              ) : null}
            </View>
          </View>
        ) : null}
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
