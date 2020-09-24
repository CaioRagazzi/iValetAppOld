import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './src/navigator/index';
import AuthProvider from './src/contexts/auth';

const App = () => {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
};

export default App;
