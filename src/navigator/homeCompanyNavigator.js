import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import IconIonicon from 'react-native-vector-icons/Ionicons';

import HomeCompanyScreen from '../screens/companyScreens/home';
import FormCarEntryScreen from '../screens/companyScreens/formCarEntry';
import EntryScreen from '../screens/companyScreens/entry';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeCompanyNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeTabNavigator} />
    </Drawer.Navigator>
  );
}

function HomeTabNavigator() {
  return (
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
        component={EntradaStackNavigator}
        options={{
          tabBarIcon: () => <IconIonicon name="car-outline" size={24} />,
        }}
      />
    </Tab.Navigator>
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

function EntradaStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#FCFCFC'},
        headerTitleStyle: {color: '#41484F'},
      }}>
      <Stack.Screen name="Entrada" component={EntryScreen} />
    </Stack.Navigator>
  );
}

export default HomeCompanyNavigator;
