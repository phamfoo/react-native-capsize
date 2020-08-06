# React Native Capsize

[![Stable Release](https://img.shields.io/npm/v/react-native-capsize.svg)](https://npm.im/react-native-capsize) [![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

A port of [Capsize](https://github.com/seek-oss/capsize) for React Native

From [Capsize's README](https://github.com/seek-oss/capsize/blob/master/README.md)

> Capsize makes the sizing and layout of text as predictable as every other element on the screen.
>
> Using font metadata, text can now be sized according to the height of its capital letters while trimming the space above capital letters and below the baseline.

## Installation

```sh
yarn add react-native-capsize
```

or

```sh
npm install react-native-capsize
```

## Usage

```jsx
import capsize from 'react-native-capsize'

const fontMetrics = {
  capHeight: 1456,
  ascent: 1900,
  descent: -500,
  lineGap: 0,
  unitsPerEm: 2048,
}

const styles = capsize({
  fontMetrics,
  capHeight: 48,
  lineGap: 24,
})

function App() {
  return <Text style={styles}>Hello</Text>
}
```

### Where do I get the font metrics?

From [Capsize's Documentation](https://github.com/seek-oss/capsize/blob/master/packages/capsize/README.md#font-metrics)

> This metadata is extracted from the metrics tables inside the font itself. You can use [the Capsize website](https://seek-oss.github.io/capsize/) to find these by selecting a font and referencing `JavaScript` tab in step 3.

For more please visit [Capsize's Documentation](https://github.com/seek-oss/capsize/blob/master/packages/capsize/README.md)

## Example

To run the example project, follow these steps:

- Clone the repo
- Run these commands

```sh
yarn
cd example
yarn && yarn start
```
