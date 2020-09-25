import React, {useContext, useEffect, useState, forwardRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, Input, Icon, Card} from 'react-native-elements';
import {AuthContext} from '../../contexts/auth';
import {showWarning} from '../../components/toast';

function LoginScreen() {
  const {error, logIn, loading} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error) {
      showWarning('Login e ou senha inválidos');
    }
  }, [error]);

  const handleLogin = () => {
    const isOk = verifyFields();

    if (isOk) {
      logIn(username, password);
    }
  };

  const verifyFields = () => {
    if (username === '' || password === '') {
      showWarning('Favor preencher todos os campos obrigatórios');
      return false;
    }
    return true;
  };

  return (
    <View style={styles.mainContainer}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.cardTitle}>iValet</Card.Title>
        <View style={styles.subMainContainer}>
          <Input
            placeholder="Email*"
            leftIcon={<Icon name="email" size={24} color="black" />}
            onChangeText={(text) => setUsername(text)}
            value={username}
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <Input
            placeholder="Password*"
            leftIcon={<Icon name="lock" size={24} color="black" />}
            onChangeText={(text) => setPassword(text)}
            value={password}
            autoCapitalize="none"
            secureTextEntry
          />
          <Button
            containerStyle={styles.button}
            title="Login"
            onPress={() => handleLogin()}
            loading={loading}
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

export default forwardRef(LoginScreen);
