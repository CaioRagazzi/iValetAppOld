import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {AuthContext} from '../../contexts/auth';
import FloatingActionButton from '../../components/floatingActionButton';
import socketIo from 'socket.io-client';

export default function HomeScreen({navigation}) {
  const authContext = useContext(AuthContext);
  const [io, setIo] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const socket = socketIo.connect('http://192.168.0.4:8082');
    setIo(socket);

    socket.on('msgToClient', (msg) => {
      handleTransactionsSocket(msg);
    });
  }, []);

  const handleTransactionsSocket = (msg) => {
    setTransactions(msg.transactions);
  };

  const handleLogOut = () => {
    io.emit('msgToServer', 'teste');
  };

  const ItemView = ({item}) => {
    return (
      <View>
        <Text>{item.placa}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Text> Home Company </Text>
      <Button title="oi" onPress={() => handleLogOut()} />
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={ItemView}
      />
      <FloatingActionButton
        text="Entrada"
        onPress={() => navigation.navigate('FormEntryCar')}
      />
    </View>
  );
}
