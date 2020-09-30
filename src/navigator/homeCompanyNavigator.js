import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeCompanyScreen from '../screens/companyScreens/home';

const Stack = createStackNavigator();

function HomeCompanyNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeCompanyScreen} />
    </Stack.Navigator>
  );
}

export default HomeCompanyNavigator;
