import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SaveIcon(props) {
  return (
    <TouchableOpacity>
      <SafeAreaView>
        <Icon
          style={styles.icon}
          name="save-outline"
          size={24}
          onPress={() => props.onPress()}
          color="#ffffff"
        />
      </SafeAreaView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingRight: 10,
  },
});
