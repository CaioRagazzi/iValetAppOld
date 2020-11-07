import React, {useEffect, useCallback, useState, useContext} from 'react';
import {View, FlatList} from 'react-native';
import HeaderPlusIcon from '../../../components/HeaderPlusIcon';
import OpenDrawerIcon from '../../../components/openDrawerIcon';
import axios from '../../../services/axios';
import {AuthContext} from '../../../contexts/auth';
import {showWarning} from '../../../components/toast';
import {ListItem, Avatar} from 'react-native-elements';

export default function Mensalistas({navigation}) {
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
        <OpenDrawerIcon onPress={() => navigation.toggleDrawer()} />
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
        console.log(res.data);
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
          containerStyle={{backgroundColor: '#7c43bd'}}
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
