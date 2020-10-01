import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';

import HomeCompanyScreen from '../screens/companyScreens/home';

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
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{tabBarIcon: () => <Icon name="home" />}}
      />
    </Tab.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeCompanyScreen} />
    </Stack.Navigator>
  );
}

export default HomeCompanyNavigator;
