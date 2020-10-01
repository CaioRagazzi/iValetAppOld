import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {AuthContext} from '../../contexts/auth';
import FloatingActionButton from '../../components/floatingActionButton';

export default function HomeScreen({navigation}) {
  const authContext = useContext(AuthContext);

  const handleLogOut = () => {
    authContext.logOut();
  };

  return (
    <View style={{flex: 1}}>
      <Text> Home Company </Text>
      <FloatingActionButton
        text="Entrada"
        onPress={() => navigation.navigate('FormEntryCar')}
      />
    </View>
  );
}
