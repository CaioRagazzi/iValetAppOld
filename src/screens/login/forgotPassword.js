import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Card} from 'react-native-elements';

import {InputEmail} from '../../components/inputEmail';

export default function ForgotPassword(props) {
  const [email, setEmail] = useState('');
  const [inputEmailErr, setInputEmailErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const forgotPassword = () => {
    console.log('forgot');
  };

  return (
    <View style={styles.mainContainer}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.cardTitle}>
          iValet - Recuperar Senha
        </Card.Title>
        <View style={styles.subMainContainer}>
          <InputEmail
            required
            onChange={(text) => setEmail(text)}
            value={email}
            hasErrors={(err) => setInputEmailErr(err)}
          />
          <View style={styles.buttonsContainer}>
            <Button
              containerStyle={styles.button}
              title="Voltar"
              onPress={() => props.navigation.goBack()}
            />
            <Button
              containerStyle={styles.button}
              title="Recuperar"
              onPress={() => forgotPassword()}
              loading={loading}
              disabled={inputEmailErr}
            />
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  subMainContainer: {
    padding: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardTitle: {
    textAlignVertical: 'center',
    color: 'white',
    backgroundColor: '#2288dd',
    fontSize: 26,
    height: 50,
  },
  cardContainer: {
    padding: 0,
  },
  button: {
    alignSelf: 'center',
    width: '30%',
  },
});
