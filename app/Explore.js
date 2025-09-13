
// Boş sayfa - sadece temel import'lar
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Explore() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Keşfet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6c63ff',
  },
});