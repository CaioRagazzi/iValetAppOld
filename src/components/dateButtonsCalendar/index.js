import React, {useState} from 'react';
import {TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import {Text as TextEl} from 'react-native-elements';
import {color} from 'react-native-reanimated';

export default function DateButtonsCalendar() {
  const [segunda, setSegunda] = useState(false);
  const [terca, setTerca] = useState(false);
  const [quarta, setQuarta] = useState(false);
  const [quinta, setQuinta] = useState(false);
  const [sexta, setSexta] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [domingo, setDomingo] = useState(false);
  return (
    <SafeAreaView style={styles.buttonsAreaContainer}>
      <TouchableOpacity
        style={[
          styles.buttonsContainer,
          {backgroundColor: segunda ? '#9E8170' : null},
        ]}
        onPress={() => setSegunda(!segunda)}>
        <TextEl h4 style={{color: segunda ? '#E1DBD4' : '#41484F'}}>
          S
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonsContainer,
          {backgroundColor: terca ? '#9E8170' : null},
        ]}
        onPress={() => setTerca(!terca)}>
        <TextEl h4 style={{color: terca ? '#E1DBD4' : '#41484F'}}>
          T
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonsContainer,
          {backgroundColor: quarta ? '#9E8170' : null},
        ]}
        onPress={() => setQuarta(!quarta)}>
        <TextEl h4 style={{color: quarta ? '#E1DBD4' : '#41484F'}}>
          Q
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonsContainer,
          {backgroundColor: quinta ? '#9E8170' : null},
        ]}
        onPress={() => setQuinta(!quinta)}>
        <TextEl h4 style={{color: quinta ? '#E1DBD4' : '#41484F'}}>
          Q
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonsContainer,
          {backgroundColor: sexta ? '#9E8170' : null},
        ]}
        onPress={() => setSexta(!sexta)}>
        <TextEl h4 style={{color: sexta ? '#E1DBD4' : '#41484F'}}>
          S
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonsContainer,
          {backgroundColor: sabado ? '#9E8170' : null},
        ]}
        onPress={() => setSabado(!sabado)}>
        <TextEl h4 style={{color: sabado ? '#E1DBD4' : '#41484F'}}>
          S
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonsContainer,
          {backgroundColor: domingo ? '#9E8170' : null},
        ]}
        onPress={() => setDomingo(!domingo)}>
        <TextEl h4 style={{color: domingo ? '#E1DBD4' : '#41484F'}}>
          D
        </TextEl>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonsAreaContainer: {
    margin: 14,
    flexDirection: 'row',
    height: '8%',
    justifyContent: 'center',
  },
  buttonsContainer: {
    width: '14%',
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#41484F',
  },
});
