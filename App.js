import React from 'react';
import { StyleSheet, View } from 'react-native';
import Emblems from './Emblems';

export default function App() {
  return (
    <View style={styles.container}>
      <Emblems />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
