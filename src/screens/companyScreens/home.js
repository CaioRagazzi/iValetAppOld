import React, {useEffect, useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text as TextH, Button} from 'react-native-elements';
import FloatingActionButton from '../../components/floatingActionButton';
import axios from '../../services/axios';
import {AuthContext} from '../../contexts/auth';
import {showWarning} from '../../components/toast';
import OpenDrawerIcon from '../../components/openDrawerIcon';

export default function HomeScreen({navigation}) {
  const {companyId} = useContext(AuthContext);
  const [isCaixaOpened, setIsCaixaOpened] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerLeft: () => (
        <OpenDrawerIcon onPress={() => navigation.toggleDrawer()} />
      ),
    });
    axios
      .get(`caixa/openedCaixa/${companyId}`)
      .then((res) => {
        if (res.data.id) {
          setIsCaixaOpened(true);
        }
      })
      .catch((err) => {
        if (err.response.data.message === 'Theres no opened Caixa') {
          setIsCaixaOpened(false);
        }
      });
  }, [companyId, navigation]);

  const openCloseCaixa = () => {
    if (isCaixaOpened) {
      axios
        .post('caixa/closeCaixa', null, {
          params: {
            companyId,
          },
        })
        .then((res) => {
          setIsCaixaOpened(false);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else {
      axios
        .post('caixa/openCaixa', null, {
          params: {
            companyId,
          },
        })
        .then((res) => {
          setIsCaixaOpened(true);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };

  const handleCarEnty = () => {
    if (isCaixaOpened) {
      navigation.navigate('FormEntryCar');
    } else {
      showWarning('O caixa esta fechado!');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TextH h2> Caixa {isCaixaOpened ? 'Aberto' : 'Fechado'} </TextH>
      <Button
        title={isCaixaOpened ? 'Fechar Caixa' : 'Abrir Caixa'}
        onPress={() => openCloseCaixa()}
      />
      <FloatingActionButton text="Entrada" onPress={() => handleCarEnty()} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flex: 1,
  },
});
