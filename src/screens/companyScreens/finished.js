import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, FlatList} from 'react-native';
import socketIo from 'socket.io-client';
import axios from '../../services/axios';
import {AuthContext} from '../../contexts/auth';
import {ListItem} from 'react-native-elements';
import IconIonicons from 'react-native-vector-icons/Ionicons';

export default function Finished() {
  const {companyId, token} = useContext(AuthContext);
  const [io, setIo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket = socketIo.connect('http://192.168.0.4:8082/', {
      query: {token},
    });
    setIo(socket);

    socket
      .on(`finishedTransactions:company:${companyId}`, (msg) => {
        addTransactions(msg);
      })
      .on('connect', () => {
        console.log('connected');
      })
      .on('disconnect', () => {
        console.log('disconnected');
      });

    getCars();
    return function cleanup() {
      console.log('cleaning');
      socket.disconnect();
    };
  }, [companyId, getCars, token]);

  const addTransactions = (msg) => {
    setLoading(true);
    setTransactions(msg);
    setLoading(false);
  };

  const getCars = useCallback(() => {
    axios
      .get(`transaction/finished/${companyId}`)
      .then((res) => {
        console.log(res.data);
        addTransactions(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [companyId]);

  const ItemView = ({item}) => {
    return (
      <ListItem key={item.id} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.placa}</ListItem.Title>
          <ListItem.Subtitle>Subtitle</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron>
          <IconIonicons name="chevron-forward-outline" />
        </ListItem.Chevron>
      </ListItem>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        refreshing={loading}
        onRefresh={getCars}
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={ItemView}
      />
    </View>
  );
}
