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
import CaixaScreen from '../screens/companyScreens/caixa';
import HandlePriceScreen from '../screens/companyScreens/price/handlePrice';
import {GatewayProvider} from '../contexts/gateway';
import {PriceProvider} from '../contexts/price';
import {CaixaProvider} from '../contexts/caixa';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeCompanyNavigator() {
  return (
    <CaixaProvider>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeTabNavigator} />
        <Drawer.Screen name="Prices" component={PricesStackNavigator} />
        <Drawer.Screen name="Caixa" component={CaixaStackNavigator} />
      </Drawer.Navigator>
    </CaixaProvider>
  );
}

function CaixaStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#4a148c'},
        headerTitleStyle: {color: '#ffffff'},
      }}>
      <Stack.Screen name="Caixa" component={CaixaScreen} />
    </Stack.Navigator>
  );
}

function HomeTabNavigator() {
  return (
    <GatewayProvider>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#ffffff',
          inactiveTintColor: '#ffffff',
          activeBackgroundColor: '#7c43bd',
          inactiveBackgroundColor: '#7c43bd',
          keyboardHidesTabBar: true,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <IconIonicon name="home" size={24} color="#ffffff" />
              ) : (
                <IconIonicon name="home-outline" size={24} color="#ffffff" />
              ),
          }}
        />
        <Tab.Screen
          name="Entrada"
          component={EntryStackNavigator}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <IconIonicon name="arrow-up-circle" size={30} color="#ffffff" />
              ) : (
                <IconIonicon
                  name="arrow-up-circle-outline"
                  size={30}
                  color="#ffffff"
                />
              ),
          }}
        />
        <Tab.Screen
          name="Saida"
          component={FinishedStackNavigator}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <IconIonicon
                  name="arrow-down-circle"
                  size={30}
                  color="#ffffff"
                />
              ) : (
                <IconIonicon
                  name="arrow-down-circle-outline"
                  size={30}
                  color="#ffffff"
                />
              ),
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
        headerStyle: {backgroundColor: '#4a148c'},
        headerTitleStyle: {color: '#ffffff'},
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
        headerStyle: {backgroundColor: '#4a148c'},
        headerTitleStyle: {color: '#ffffff'},
        headerTintColor: 'white',
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
        headerStyle: {backgroundColor: '#4a148c'},
        headerTitleStyle: {color: '#ffffff'},
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
          headerStyle: {backgroundColor: '#4a148c'},
          headerTitleStyle: {color: '#ffffff'},
        }}>
        <Stack.Screen name="Prices" component={PricesScreen} />
        <Stack.Screen name="HandlePrice" component={HandlePriceScreen} />
      </Stack.Navigator>
    </PriceProvider>
  );
}

export default HomeCompanyNavigator;
