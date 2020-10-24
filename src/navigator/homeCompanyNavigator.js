import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import IconIonicon from 'react-native-vector-icons/Ionicons';

import CustomDrawerContent from './customDrawer';
import HomeCompanyScreen from '../screens/companyScreens/home';
import FormCarEntryScreen from '../screens/companyScreens/formCarEntry';
import EntryScreen from '../screens/companyScreens/entry';
import CarDetailsScreen from '../screens/companyScreens/carDetails';
import FinishedScreen from '../screens/companyScreens/finished';
import PricesScreen from '../screens/companyScreens/price/prices';
import HandlePriceScreen from '../screens/companyScreens/price/handlePrice';
import {GatewayProvider} from '../contexts/gateway';
import {PriceProvider} from '../contexts/price';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeCompanyNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeTabNavigator} />
      <Drawer.Screen name="Prices" component={PricesStackNavigator} />
    </Drawer.Navigator>
  );
}

function HomeTabNavigator() {
  return (
    <GatewayProvider>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#41484F',
          activeBackgroundColor: '#FCFCFC',
          keyboardHidesTabBar: true,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: () => <IconIonicon name="home-outline" size={24} />,
          }}
        />
        <Tab.Screen
          name="Entrada"
          component={EntryStackNavigator}
          options={{
            tabBarIcon: () => <IconIonicon name="car-outline" size={24} />,
          }}
        />
        <Tab.Screen
          name="Saida"
          component={FinishedStackNavigator}
          options={{
            tabBarIcon: () => <IconIonicon name="car-outline" size={24} />,
          }}
        />
      </Tab.Navigator>
    </GatewayProvider>
  );
}

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#FCFCFC'},
        headerTitleStyle: {color: '#41484F'},
      }}>
      <Stack.Screen name="Home" component={HomeCompanyScreen} />
      <Stack.Screen
        name="FormEntryCar"
        component={FormCarEntryScreen}
        options={{title: 'Formulário Entrada'}}
      />
    </Stack.Navigator>
  );
}

function EntryStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#FCFCFC'},
        headerTitleStyle: {color: '#41484F'},
      }}>
      <Stack.Screen name="Entrada" component={EntryScreen} />
      <Stack.Screen name="Details" component={CarDetailsScreen} />
    </Stack.Navigator>
  );
}

function FinishedStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#FCFCFC'},
        headerTitleStyle: {color: '#41484F'},
      }}>
      <Stack.Screen name="Saida" component={FinishedScreen} />
    </Stack.Navigator>
  );
}

function PricesStackNavigator() {
  return (
    <PriceProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#FCFCFC'},
          headerTitleStyle: {color: '#41484F'},
        }}>
        <Stack.Screen name="Prices" component={PricesScreen} />
        <Stack.Screen name="HandlePrice" component={HandlePriceScreen} />
      </Stack.Navigator>
    </PriceProvider>
  );
}

export default HomeCompanyNavigator;
