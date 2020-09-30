import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './src/navigator/index';
import AuthProvider from './src/contexts/auth';
import {ThemeProvider} from 'react-native-elements';

const App = () => {
  const theme = {
    Button: {
      raised: true,
      titleStyle: {},
      buttonStyle: {
        backgroundColor: '#9E8170',
      },
    },
    Icon: {
      color: '#41484F',
    },
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Navigator />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
