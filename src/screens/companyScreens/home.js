import React, {useContext} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
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
      <Button title="oi" onPress={() => handleLogOut()} />
      <FloatingActionButton
        text="Entrada"
        onPress={() => navigation.navigate('FormEntryCar')}
      />
    </View>
  );
}
