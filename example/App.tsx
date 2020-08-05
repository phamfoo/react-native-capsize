import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import capsize from 'react-native-capsize'
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter'
import { AppLoading } from 'expo'
import Slider from '@react-native-community/slider'

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

  const [capHeight, setCapHeight] = React.useState(16)
  const [lineGap, setLineGap] = React.useState(4)

  const textStyle = {
    ...capsize({
      capHeight,
      lineGap,
      fontMetrics,
    }),
  }

  return fontsLoaded ? (
    <View style={styles.container}>
      <Text>{`Cap Height: ${capHeight}`}</Text>
      <Slider
        minimumValue={8}
        maximumValue={28}
        onValueChange={setCapHeight}
        onSlidingComplete={setCapHeight}
        step={1}
        minimumTrackTintColor="rgb(237, 100, 166)"
        maximumTrackTintColor="#FDE2EB"
      />
      <Text>{`Line Gap: ${lineGap}`}</Text>
      <Slider
        minimumValue={4}
        maximumValue={28}
        onValueChange={setLineGap}
        onSlidingComplete={setLineGap}
        step={1}
        minimumTrackTintColor="rgb(237, 100, 166)"
        maximumTrackTintColor="#FDE2EB"
      />
      <View style={styles.textContainer}>
        <Text style={textStyle}>
          Lorem ipsum Lolor sit amet, Lonsectetur adipiscing elit. Duis eu
          ornare nisi, sed feugiat metus. Pellentesque rutrum vel metus non
          dignissim. Aenean egestas neque mattis mi maximus luctus. Praesent et
          commodo dui, nec eleifend lectus. Pellentesque blandit nisi tellus, id
          efficitur urna consectetur id. Sed convallis tempor dui vel aliquet.
        </Text>
      </View>
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
  textContainer: {
    backgroundColor: '#FDE2EB',
    marginTop: 16,
  },
})
