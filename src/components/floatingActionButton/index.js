import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FloatingActionButton(props) {
  const getIcon = () => {
    if (props.icon) {
      return props.icon;
    } else {
      return <Icon name="car-sport-outline" size={24} color="#E1DBD4" />;
    }
  };

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={props.onPress}>
      {getIcon()}
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 65,
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#832D25',
    borderRadius: 100,
    elevation: 5,
  },
  text: {
    color: '#E1DBD4',
    fontSize: 12,
  },
});
