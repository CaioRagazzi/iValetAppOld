import React, {useState, useEffect} from 'react';
import {TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import {Text as TextEl} from 'react-native-elements';

export default function DateButtonsCalendar(props) {
  const [segunda, setSegunda] = useState(false);
  const [terca, setTerca] = useState(false);
  const [quarta, setQuarta] = useState(false);
  const [quinta, setQuinta] = useState(false);
  const [sexta, setSexta] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [domingo, setDomingo] = useState(false);

  useEffect(() => {
    const selectedWeekDays = () => {
      let string = `${segunda ? 'M|' : ''}${terca ? 'TU|' : ''}${
        quarta ? 'W|' : ''
      }${quinta ? 'TH|' : ''}${sexta ? 'F|' : ''}${sabado ? 'SA|' : ''}${
        domingo ? 'SU|' : ''
      }`;

      const formatedString = deletePipeIfLast(string);
      props.OnWeekDayChange(formatedString);
    };

    const deletePipeIfLast = (text) => {
      if (text[text.length - 1] === '|') {
        const newString = text.slice(0, -1);
        return newString;
      }
      return text;
    };

    selectedWeekDays();
  }, [segunda, terca, quarta, quinta, sexta, sabado, domingo, props]);

  return (
    <SafeAreaView style={styles.buttonsAreaContainer}>
      <TouchableOpacity
        style={
          segunda
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => setSegunda(!segunda)}>
        <TextEl h4 style={segunda ? styles.textEnable : styles.textDisable}>
          S
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          terca ? styles.buttonsContainerEnable : styles.buttonsContainerDisable
        }
        onPress={() => setTerca(!terca)}>
        <TextEl h4 style={terca ? styles.textEnable : styles.textDisable}>
          T
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          quarta
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => setQuarta(!quarta)}>
        <TextEl h4 style={quarta ? styles.textEnable : styles.textDisable}>
          Q
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          quinta
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => setQuinta(!quinta)}>
        <TextEl h4 style={quinta ? styles.textEnable : styles.textDisable}>
          Q
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          sexta ? styles.buttonsContainerEnable : styles.buttonsContainerDisable
        }
        onPress={() => setSexta(!sexta)}>
        <TextEl h4 style={sexta ? styles.textEnable : styles.textDisable}>
          S
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          sabado
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => setSabado(!sabado)}>
        <TextEl h4 style={sabado ? styles.textEnable : styles.textDisable}>
          S
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          domingo
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => setDomingo(!domingo)}>
        <TextEl h4 style={domingo ? styles.textEnable : styles.textDisable}>
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
    height: 50,
    justifyContent: 'center',
  },
  buttonsContainerDisable: {
    width: '14%',
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainerEnable: {
    width: '15%',
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#832D25',
  },
  textEnable: {
    color: '#832D25',
  },
  textDisable: {
    color: '#41484F',
  },
});
