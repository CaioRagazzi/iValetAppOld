import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import {Button, Input, Icon, Card} from 'react-native-elements';
import {AuthContext} from '../../contexts/auth';
import {showWarning} from '../../components/toast';
import {validateEmail} from '../../utils/utilsFunctions';

import {InputEmail} from '../../components/inputEmail';
import {InputPassword} from '../../components/inputPassword';

function LoginScreen(props) {
  const {error, logIn, loading} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputEmailErrorMessage, setInputEmailErrorMessage] = useState('');
  const [inputEmailErr, setInputEmailErr] = useState(false);
  const [inputPasswordErr, setInputPasswordErr] = useState(false);

  useEffect(() => {
    if (error) {
      showWarning('Login e ou senha inválidos');
    }
  }, [error]);

  useEffect(() => {
    if (!validateEmail(username) && username !== '') {
      setInputEmailErrorMessage('Email inválido');
    } else {
      setInputEmailErrorMessage('');
    }
  }, [username]);

  // useEffect(() => {
  //   if (password.length < 6 && password !== '') {
  //     setInputPasswordErrorMessage('Senha deve ter no mínimo 6 caracteres');
  //   } else {
  //     setInputPasswordErrorMessage('');
  //   }
  // }, [password]);

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

  const goToCadastro = () => {
    props.navigation.navigate('CadastroLogin');
  };

  const goToForgotPassword = () => {
    props.navigation.navigate('ForgotPassword');
  };

  const checkEnabledButton = () => {
    if (
      username === '' ||
      password === '' ||
      inputEmailErrorMessage.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.cardTitle}>iValet</Card.Title>
        <View style={styles.subMainContainer}>
          <InputEmail
            onChange={(text) => setUsername(text)}
            value={username}
            hasErrors={(err) => setInputEmailErr(err)}
          />
          <InputPassword
            onChange={(text) => setPassword(text)}
            value={password}
            showPasswordSize={false}
          />
          <Button
            containerStyle={styles.button}
            title="Login"
            onPress={() => handleLogin()}
            loading={loading}
            disabled={checkEnabledButton()}
          />
          <View style={styles.infoContainer}>
            <TouchableWithoutFeedback onPress={() => goToForgotPassword()}>
              <Text style={styles.txtForgotPassword}>Esqueci a senha</Text>
            </TouchableWithoutFeedback>
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.txtLogin}>Não possui login?</Text>
              <TouchableWithoutFeedback onPress={() => goToCadastro()}>
                <Text style={styles.txtUnderline}>Cadastre-se</Text>
              </TouchableWithoutFeedback>
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

export default LoginScreen;
