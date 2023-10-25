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
    backgroundColor: 'hsl(31, 78%, 38%)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    width: 250,
    height: 250,
    backgroundColor: 'hsl(31, 20%, 90%)',
    borderWidth: 4,
    borderColor: 'hsl(31, 99%, 35%)',
    shadowColor: 'hsl(31, 8%, 96%)',
    borderRadius: 1500,
    shadowRadius: 1000,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 60,
    color: 'hsl(31, 68%, 32%)',
    fontWeight: 'bold'
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
    fontSize: 30,
    color: 'white',
    
  },
  button: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: -30,
    
  },
  
  startButton: {
    backgroundColor: 'hsl(31, 20%, 90%)',
    fontSize: 220,
    fontWeight: 'bold',
  },
  pauseButton: {
    backgroundColor: 'hsl(31, 20%, 90%)',
  },
  resetButton: {
    backgroundColor: 'hsl(31, 20%, 90%)',
  },
  
});

export default FocusApp;