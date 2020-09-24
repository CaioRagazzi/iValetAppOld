import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../../contexts/auth';

export default function LoginScreen() {
  const authContext = useContext(AuthContext);

  const handleLogin = () => {
    console.log('login');
    authContext.logIn();
  };

  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Logar" onPress={() => handleLogin()} />
    </View>
  );
}
