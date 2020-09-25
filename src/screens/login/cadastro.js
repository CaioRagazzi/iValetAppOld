import React, {useState, forwardRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Card, Input, Icon} from 'react-native-elements';

import {InputEmail} from '../../components/inputEmail';
import {InputPassword} from '../../components/inputPassword';

function CadastroLogin(props) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputEmailErr, setInputEmailErr] = useState(false);
  const [inputPasswordErr, setInputPasswordErr] = useState(false);
  const [inputConfirmPasswordErr, setInputConfirmPasswordErr] = useState(false);

  const handleRegister = () => {
    console.log('register');
  };

  const checkEnabledButton = () => {
    if (
      inputEmailErr ||
      inputPasswordErr ||
      inputConfirmPasswordErr ||
      name.length <= 0 ||
      company.length <= 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.cardTitle}>iValet - Cadastro</Card.Title>
        <View style={styles.subMainContainer}>
          <Input
            placeholder="Nome"
            leftIcon={<Icon name="person" size={24} color="black" />}
            onChangeText={(text) => setName(text)}
            value={name}
            autoCapitalize="words"
            textContentType="name"
            errorMessage={name.length <= 0 ? 'Nome é obrigatório' : ''}
          />
          <InputEmail
            required
            onChange={(text) => setUsername(text)}
            value={username}
            hasErrors={(err) => setInputEmailErr(err)}
          />
          <Input
            placeholder="Empresa"
            leftIcon={<Icon name="business" size={24} color="black" />}
            onChangeText={(text) => setCompany(text)}
            value={company}
            autoCapitalize="words"
            textContentType="name"
            errorMessage={
              company.length <= 0 ? 'Nome da empresa é obrigatório' : ''
            }
          />
          <InputPassword
            onChange={(text) => setPassword(text)}
            required
            value={password}
            hasErrors={(err) => setInputPasswordErr(err)}
            showPasswordSize={true}
          />
          <InputPassword
            placeholder="Confirme a senha"
            onChange={(text) => setConfirmPassword(text)}
            required
            value={confirmPassword}
            hasErrors={(err) => setInputConfirmPasswordErr(err)}
            showPasswordSize={true}
          />
          <View style={styles.buttonsContainer}>
            <Button
              containerStyle={styles.button}
              title="Voltar"
              onPress={() => props.navigation.goBack()}
            />
            <Button
              containerStyle={styles.button}
              title="Cadastrar"
              onPress={() => handleRegister()}
              loading={loading}
              disabled={checkEnabledButton()}
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

export default CadastroLogin;
