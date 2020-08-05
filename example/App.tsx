import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import capsize from 'react-native-capsize'

const style = capsize()
export default function App() {
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(style, null, 2)}</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
