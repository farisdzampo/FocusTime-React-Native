import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { useKeepAwake } from 'expo-keep-awake'
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const VIBTIME = 1000;

const PATTERN = [
  1 * VIBTIME,
  1 * VIBTIME,
  1 * VIBTIME
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const addFiveMinutes = () => {
    setMinutes(5)
  }

  const addTenMinutes = () => {
    setMinutes(10)
  }

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setProgress(1);
    setIsStarted(false);
    reset();
    onTimerEnd(focusSubject);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color={'yellow'}
          style={{ height: spacing.sm }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
        <RoundedButton title={5} onPress={addFiveMinutes}/>
        <RoundedButton title={10} onPress={addTenMinutes}/>
      </View>
      <View style={{justifyContent:'center', alignItems:'center'}}>
      <RoundedButton title={'back'} size={90} onPress={clearSubject}/></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
});
