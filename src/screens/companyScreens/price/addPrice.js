import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import DateButtonsCalendar from '../../../components/dateButtonsCalendar';
import OverlaySelectTime from '../../../components/overlaySelectTime';

export default function AddPrice() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <DateButtonsCalendar />
      <OverlaySelectTime visible={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
