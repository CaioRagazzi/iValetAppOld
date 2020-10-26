import React, {useEffect, useContext, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
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
        .catch((err) => {});
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
        .catch((err) => {});
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
      <View style={styles.resumeContainer}>
        <View style={styles.containerRow}>
          <Text>Total 1</Text>
          <Text>12</Text>
        </View>
        <View style={styles.containerRow}>
          <Text>Total 2</Text>
          <Text>23</Text>
        </View>
        <View style={styles.containerRow}>
          <Text>Total 3</Text>
          <Text>30</Text>
        </View>
        <View style={styles.containerRow}>
          <Text>Total 4</Text>
          <Text>10</Text>
        </View>
        <View style={styles.containerRow}>
          <Text>Total 5</Text>
          <Text>50</Text>
        </View>
      </View>
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
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resumeContainer: {
    width: '50%',
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
  },
});
