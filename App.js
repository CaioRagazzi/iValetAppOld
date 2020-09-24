import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './src/navigator/index';
import AuthProvider from './src/contexts/auth';
import {ThemeProvider} from 'react-native-elements';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Navigator />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
