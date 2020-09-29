import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/login/login';
import ForgotPasswordScreen from '../screens/login/forgotPassword';
import CadastroLoginScreen from '../screens/login/cadastro';
import HomeScreen from '../screens/home/home';
import SelectTypeScreen from '../screens/login/selectType';
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
      <Stack.Screen
        name="CadastroLogin"
        component={CadastroLoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectType"
        component={SelectTypeScreen}
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
