import React, {useContext} from 'react';
import { View, Text, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {AuthContext} from '../../contexts/auth';

export default function CustomDrawerContent(props) {
  const {logOut} = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1, marginTop: -4}}>
      <View style={styles.topContainer}>
      </View>
      <DrawerItemList {...props} activeTintColor="#7c43bd" />
      <DrawerItem label="Logout" onPress={() => logOut()} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    height: '35%',
    backgroundColor: '#4a148c',    
  }
})
