import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FloatingActionButton(props) {
  const getIcon = () => {
    if (props.icon) {
      return props.icon;
    } else {
      return (
        <Icon
          style={styles.icon}
          name="car-sport-outline"
          size={24}
          color="#ffffff"
        />
      );
    }
  };

  const getContent = () => {
    if (props.isLoading) {
      return <ActivityIndicator color="#ffffff" />;
    } else {
      return (
        <View>
          {getIcon()}
          {getText()}
        </View>
      );
    }
  };

  const getText = () => {
    return <Text style={styles.text}>{props.text}</Text>;
  };

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={props.onPress}>
      {getContent()}
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
    backgroundColor: '#4a148c',
    borderRadius: 100,
    elevation: 5,
  },
  text: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  icon: {
    alignSelf: 'center',
  },
});
