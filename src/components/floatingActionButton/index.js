import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FloatingActionButton(props) {
  const getIcon = () => {
    if (props.icon) {
      return props.icon;
    } else {
      return <Icon name="car-sport-outline" size={24} color="#000" />;
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
    backgroundColor: '#BB86FC',
    borderRadius: 100,
    elevation: 5,
  },
  text: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
