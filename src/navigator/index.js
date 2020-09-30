import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/login/login';
import ForgotPasswordScreen from '../screens/login/forgotPassword';
import CadastroLoginScreen from '../screens/login/cadastro';
import HomeCompanyScreen from '../screens/companyScreens/home';
import HomeClientScreen from '../screens/clientScreens/home';
import LoadingScreen from '../screens/splashScreen';
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

function HomeCompanyNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeCompanyScreen} />
    </Stack.Navigator>
  );
}

function HomeClientNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeClientScreen} />
    </Stack.Navigator>
  );
}

function SplashScreenNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Loading"
        component={LoadingScreen}
      />
    </Stack.Navigator>
  );
}

function Navigator() {
  const {type, logged, splash} = useContext(AuthContext);

  const getNavigator = () => {
    if (logged && type === 1) {
      return <HomeCompanyNavigator />;
    }
    if (logged && type === 2) {
      return <HomeClientNavigator />;
    }
    return <LoginNavigator />;
  };

  return (
    <NavigationContainer>
      {splash ? <SplashScreenNavigator /> : getNavigator()}
    </NavigationContainer>
  );
}

export default Navigator;
