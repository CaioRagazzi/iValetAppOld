import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/login/login';
import HomeScreen from '../screens/home/home';
import {AuthContext} from '../contexts/auth';

const Stack = createStackNavigator();

function LoginNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function Navigator() {
  const authContext = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authContext.loggedIn ? <HomeNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
}

export default Navigator;
