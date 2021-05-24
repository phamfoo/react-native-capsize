import * as React from 'react'
import { StyleSheet, View, Text, Platform, PixelRatio } from 'react-native'
import capsize from 'react-native-capsize'
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter'
import Slider from '@react-native-community/slider'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

const fontMetrics = {
  capHeight: 2048,
  ascent: 2728,
  descent: -680,
  lineGap: 0,
  unitsPerEm: 2816,
}

function Capsize() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
  })

  const [capHeight, setCapHeight] = React.useState(18)
  const [lineGap, setLineGap] = React.useState(8)
  const [numberOfLines, setNumberOfLines] = React.useState(0)

  const textStyle = {
    ...capsize({
      capHeight,
      lineGap,
      fontMetrics,
    }),
    fontFamily: 'Inter_400Regular',
  }

  return fontsLoaded ? (
    <SafeAreaView style={styles.container}>
      <Text>{`Cap Height: ${capHeight}`}</Text>
      <View style={styles.sliderContainer}>
        <Slider
          minimumValue={8}
          maximumValue={Platform.OS === 'web' ? 100 : 28}
          onValueChange={setCapHeight}
          onSlidingComplete={setCapHeight}
          step={1}
          thumbTintColor="rgb(237, 100, 166)"
          minimumTrackTintColor="rgb(237, 100, 166)"
          maximumTrackTintColor="#FDE2EB"
        />
      </View>
      <Text>{`Line Gap: ${lineGap}`}</Text>
      <View style={styles.sliderContainer}>
        <Slider
          minimumValue={0}
          maximumValue={Platform.OS === 'web' ? 100 : 28}
          onValueChange={setLineGap}
          onSlidingComplete={setLineGap}
          step={1}
          thumbTintColor="rgb(237, 100, 166)"
          minimumTrackTintColor="rgb(237, 100, 166)"
          maximumTrackTintColor="#FDE2EB"
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textHighlight}>
          {Array(numberOfLines)
            .fill(null)
            .map((_, index) => (
              <View
                key={index}
                style={{
                  height: capHeight * PixelRatio.getFontScale(),
                  backgroundColor: '#FDE2EB',
                }}
              />
            ))}
        </View>
        <View>
          <Text
            style={textStyle}
            onTextLayout={(e) => setNumberOfLines(e.nativeEvent.lines.length)}
          >
            Lorem ipsum Lolor sit amet, Lonsectetur adipiscing elit. Duis eu
            ornare nisi, sed feugiat metus. Pellentesque rutrum vel metus non
            dignissim. Aenean egestas neque mattis mi maximus luctus. Praesent
            et commodo dui, nec eleifend lectus. Pellentesque blandit nisi
            tellus, id efficitur urna consectetur id. Sed convallis tempor dui
            vel aliquet.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  ) : null
}
export default function App() {
  return (
    <SafeAreaProvider>
      <Capsize />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  textContainer: {
    marginTop: 16,
  },
  textHighlight: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  sliderContainer: {
    paddingVertical: Platform.OS === 'web' ? 24 : 12,
  },
})
