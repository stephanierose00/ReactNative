import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const FocusApp = () => {
  const initialTime = 10 * 60;
  const [timerCount, setTimerCount] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimerCount(initialTime);
  };

  useEffect(() => {
    let timerInterval;
    if (isRunning) {
      timerInterval = setInterval(() => {
        if (timerCount === 0) {
          clearInterval(timerInterval);
          setIsRunning(false);
        } else {
          setTimerCount(prevTime => prevTime - 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning, timerCount]);

  return (
    <SafeAreaView style={styles.container}>
     <Text style={styles.hello}>Hello!</Text>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(timerCount)}</Text>
      </View>
      <View style={styles.controls}>
        {isRunning ? (
          <TouchableOpacity
            style={[styles.button, styles.pauseButton]}
            onPress={pauseTimer}
          >
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={startTimer}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
        <View style={{ width: 60, padding: 50 }} />
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetTimer}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const formatTime = time => {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'hsl(181, 33%, 30%)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    width: 250,
    height: 250,
    backgroundColor: 'hsl(181, 23%, 88%)',
    borderWidth: 4,
    borderColor: 'hsl(192, 100%, 25%)',
    shadowColor: 'black',
    borderRadius: 1500,
    shadowRadius: 1000,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 60,
    color: 'hsl(181, 33%, 30%)',
  },
  controls: {
    width: 300,
    height: 60,
    fontSize: 600,
    fontWeight: 'bolder',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
  },

  hello: {
    marginBottom: 50,
    justifyContent: 'center',
    fontSize: 50,
  },
  button: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  
  startButton: {
    backgroundColor: 'hsl(181, 23%, 88%)',
    fontSize: 220,
  },
  pauseButton: {
    backgroundColor: 'hsl(181, 23%, 88%)',
  },
  resetButton: {
    backgroundColor: 'hsl(181, 23%, 88%)',
  },
  
});

export default FocusApp;