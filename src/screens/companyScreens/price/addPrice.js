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
import {Divider} from 'react-native-elements';
import DateButtonsCalendar from '../../../components/dateButtonsCalendar';
import SaveIcon from '../../../components/saveIcon';
import {PriceContext} from '../../../contexts/price';
import {showWarning} from '../../../components/toast';
import {HeaderBackButton} from '@react-navigation/stack';
import FixedContainer from '../../../components/price/fixed/fixedContainer';
import DynamicContainer from '../../../components/price/dynamic/dynamicContainer';

export default function AddPrice({navigation, route}) {
  const {
    fixedValue,
    cleanFields,
    isDynamicEnabled,
    quantityDynamic,
    setQuantityDynamic,
    createFixedPrice,
    createDynamicPrice,
    hasMaxValue,
    maxValue,
    updateFixedPrice,
    typePrice,
    handleSwitches,
  } = useContext(PriceContext);

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
      if (typePrice === 1) {
        if (!fixedValue) {
          showWarning('Favor preencher o campo valor');
          return;
        }
        if (!isEdit) {
          await createFixedPrice(selectedWeekDays).then((res) => {
            created = res;
          });
        } else {
          await updateFixedPrice(selectedWeekDays).then((res) => {
            created = res;
          });
        }
        if (!created) {
          return;
        }
        navigation.goBack();
        cleanFields();
      }
      if (typePrice === 2 && !isEdit) {
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
    updateFixedPrice,
  ]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled">
        <DateButtonsCalendar
          OnWeekDayChange={(weekDays) => setSelectedWeekDays(weekDays)}
        />

        <FixedContainer />

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
        <DynamicContainer />
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
});
