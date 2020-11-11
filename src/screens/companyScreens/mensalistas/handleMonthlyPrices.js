import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Card, Input} from 'react-native-elements';
import OverlayLoading from '../../../components/overlayLoading';
import {Icon} from 'native-base';
import {HeaderBackButton} from '@react-navigation/stack';

export default function HandleMonthlyPrices({navigation}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: `Tabela de Preço ${name}`,
      headerLeft: () => (
        <HeaderBackButton
          tintColor="#ffffff"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation, name]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Nome*</Card.Title>
          <Input
            placeholder="Digite o nome da tabela"
            leftIcon={
              <Icon
                type="MaterialIcons"
                name="backup-table"
                size={24}
                color="black"
              />
            }
            onChangeText={(value) => setName(value)}
          />
        </Card>

        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Valor*</Card.Title>
          <Input
            placeholder="Digite o valor da tabela"
            leftIcon={
              <Icon
                type="MaterialIcons"
                name="backup-table"
                size={24}
                color="black"
              />
            }
            onChangeText={(value) => setName(value)}
          />
        </Card>

        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Descrição</Card.Title>
          <Input
            placeholder="Digite a descrição da tabela"
            leftIcon={
              <Icon
                type="MaterialIcons"
                name="backup-table"
                size={24}
                color="black"
              />
            }
            onChangeText={(value) => setName(value)}
          />
        </Card>
      </ScrollView>
      <OverlayLoading isLoading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    elevation: 5,
  },
});
