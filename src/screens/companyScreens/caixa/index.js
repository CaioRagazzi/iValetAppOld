import React, {useEffect, useContext} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import OpenDrawerIcon from '../../../components/openDrawerIcon';
import {Card} from 'react-native-elements';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {CaixaContext} from '../../../contexts/caixa';

export default function CaixaScreen({navigation}) {
  const {loading, isCaixaOpened, openCloseCaixa} = useContext(CaixaContext);

  useEffect(() => {
    navigation.setOptions({
      title: 'Caixa',
      headerLeft: () => (
        <OpenDrawerIcon onPress={() => navigation.toggleDrawer()} />
      ),
    });
  }, [navigation]);

  const getTitleCaixa = () => {
    if (loading) {
      return <ActivityIndicator color="#ffffff" />;
    } else if (isCaixaOpened) {
      return <Text style={styles.text}>Fechar Caixa</Text>;
    } else {
      return <Text style={styles.text}>Abrir Caixa</Text>;
    }
  };

  const getIconCaixa = () => {
    if (loading) {
      return <ActivityIndicator color="#ffffff" />;
    } else if (isCaixaOpened) {
      return <IconFontisto name="dropbox" size={60} color="#ffffff" />;
    } else {
      return <IconIonicons name="cube-outline" size={60} color="#ffffff" />;
    }
  };

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Card containerStyle={styles.card} wrapperStyle={{flex: 1}}>
          <TouchableOpacity style={{flex: 1}} onPress={() => openCloseCaixa()}>
            <View style={styles.cardTitle}>{getTitleCaixa()}</View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {getIconCaixa()}
            </View>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '35%',
    height: '26%',
    borderRadius: 10,
    padding: 0,
    backgroundColor: '#7c42bd',
    elevation: 5,
  },
  cardTitle: {
    justifyContent: 'center',
    backgroundColor: '#12005e',
    height: 40,
    padding: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tinyLogo: {
    alignSelf: 'center',
    height: 80,
    width: 80,
    opacity: 0.7,
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
  },
});
