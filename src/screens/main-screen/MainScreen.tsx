import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

export const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main page</Text>
      <Text style={styles.subtitle}>
        There should be information about the main screen, but it is not.
      </Text>
    </View>
  );
};
