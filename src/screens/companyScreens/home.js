import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {AuthContext} from '../../contexts/auth';

export default function HomeScreen() {
  const authContext = useContext(AuthContext);

  const handleLogOut = () => {
    authContext.logOut();
  };

  return (
    <View>
      <Text> Home Company </Text>
      <Button title="Deslogar" onPress={() => handleLogOut()} />
    </View>
  );
}
