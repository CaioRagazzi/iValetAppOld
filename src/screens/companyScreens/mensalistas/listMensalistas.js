import React, {useEffect, useCallback, useState, useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import HeaderPlusIcon from '../../../components/HeaderPlusIcon';
import axios from '../../../services/axios';
import {AuthContext} from '../../../contexts/auth';
import {showWarning} from '../../../components/toast';
import {ListItem, Avatar} from 'react-native-elements';
import {HeaderBackButton} from '@react-navigation/stack';

export default function ListMensalistas({navigation}) {
  const {companyId} = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [mensalistas, setMensalistas] = useState();

  useEffect(() => {
    navigation.setOptions({
      title: 'Mensalistas',
      headerRight: () => (
        <HeaderPlusIcon onPress={() => navigation.navigate('AddMensalista')} />
      ),
      headerLeft: () => (
        <HeaderBackButton
          tintColor="#ffffff"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });

    getMensalistas();
  }, [navigation, companyId, getMensalistas]);

  const getMensalistas = useCallback(async () => {
    setLoading(true);
    setMensalistas();
    await axios
      .get(`monthlycustomer/${companyId}`)
      .then((res) => {
        setMensalistas(res.data);
        setLoading(false);
      })
      .catch(() => {
        showWarning('Erro buscando preços');
        setLoading(false);
      });
  }, [companyId]);

  const renderItem = ({item}) => {
    const customerName = item.customer.name.toUpperCase();
    return (
      <ListItem bottomDivider onPress={() => {}}>
        <Avatar
          rounded
          title={customerName.substring(0, 2)}
          containerStyle={styles.avatar}
        />
        <ListItem.Content>
          <ListItem.Title>{customerName}</ListItem.Title>
          <ListItem.Subtitle>
            {item.customer.placa.toUpperCase()}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  return (
    <View>
      <FlatList
        data={mensalistas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={() => getMensalistas()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#7c43bd',
  },
});
