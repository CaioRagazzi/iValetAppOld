import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, Input, Icon, Card} from 'react-native-elements';
import {AuthContext} from '../../contexts/auth';

export default function LoginScreen() {
  const authContext = useContext(AuthContext);

  const handleLogin = () => {
    console.log('login');
    authContext.logIn();
  };

  return (
    <View style={styles.mainContainer}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.cardTitle}>iValet</Card.Title>
        <View style={styles.subMainContainer}>
          <Input
            placeholder="Email"
            leftIcon={<Icon name="email" size={24} color="black" />}
          />
          <Input
            placeholder="Password"
            leftIcon={<Icon name="lock" size={24} color="black" />}
          />
          <Button
            containerStyle={styles.button}
            title="Login"
            onPress={() => handleLogin()}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.txtForgotPassword}>Esqueci a senha</Text>
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.txtLogin}>Não possui login?</Text>
              <Text style={styles.txtUnderline}>Cadastre-se</Text>
            </View>
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
  forgotPasswordContainer: {
    paddingTop: 16,
    flexDirection: 'row',
  },
  infoContainer: {
    alignItems: 'center',
  },
  txtForgotPassword: {
    textDecorationLine: 'underline',
    paddingTop: 10,
    fontSize: 16,
  },
  txtUnderline: {
    textDecorationLine: 'underline',
    paddingLeft: 2,
    fontSize: 16,
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
  txtLogin: {
    fontSize: 16,
  },
  button: {
    alignSelf: 'center',
    width: '50%',
  },
});
