import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from './src/navigator/index';
import AuthProvider from './src/contexts/auth';
import {ThemeProvider} from 'react-native-elements';

const App = () => {
  const theme = {
    Button: {
      raised: true,
      titleStyle: {},
      buttonStyle: {
        backgroundColor: '#BB86FC',
      },
    },
    Icon: {
      color: '#41484F',
    },
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor="#6200EE" />
        <Navigator />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
