import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const ShakeAlertButton = () => {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    subscribe();

    return () => unsubscribe();
  }, []);

  const subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        const totalForce = Math.sqrt(
          Math.pow(accelerometerData.x, 2.2) +
          Math.pow(accelerometerData.y, 2.2) +
          Math.pow(accelerometerData.z, 2.2)
        );

        if (totalForce > 1.4) {
          Alert.alert('Device Shake Detected!', 'You shook the device!');
        }
      })
    );

    Accelerometer.setUpdateInterval(500);
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  return (
    <View style={styles.container}>
      <Button title="Shake Alert Button" onPress={() => Alert.alert('Button Pressed', 'You pressed the button!')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default ShakeAlertButton;
