import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import capsize from 'react-native-capsize'
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter'
import { AppLoading } from 'expo'

const fontMetrics = {
  capHeight: 2048,
  ascent: 2728,
  descent: -680,
  lineGap: 0,
  unitsPerEm: 2816,
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
  })

  return fontsLoaded ? (
    <View style={styles.container}>
      <Text style={styles.text}>
        Lorem ipsum Lolor sit amet, Lonsectetur adipiscing elit. Duis eu ornare
        nisi, sed feugiat metus. Pellentesque rutrum vel metus non dignissim.
        Aenean egestas neque mattis mi maximus luctus. Praesent et commodo dui,
        nec eleifend lectus. Pellentesque blandit nisi tellus, id efficitur urna
        consectetur id. Sed convallis tempor dui vel aliquet.
      </Text>
    </View>
  ) : (
    <AppLoading />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  text: {
    ...capsize({
      fontMetrics,
      capHeight: 18,
      lineGap: 8,
    }),
  },
})
