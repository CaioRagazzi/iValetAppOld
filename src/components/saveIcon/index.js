import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SaveIcon(props) {
  return (
    <SafeAreaView>
      <Icon
        style={styles.icon}
        name="save-outline"
        size={24}
        onPress={() => props.onPress()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingRight: 10,
  },
});
