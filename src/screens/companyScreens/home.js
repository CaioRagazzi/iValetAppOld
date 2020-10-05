import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FloatingActionButton from '../../components/floatingActionButton';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.mainContainer}>
      <Text> Home Company </Text>
      <FloatingActionButton
        text="Entrada"
        onPress={() => navigation.navigate('FormEntryCar')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
