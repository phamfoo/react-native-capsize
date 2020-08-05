import roundTo from 'round-to'

export interface FontMetrics {
  ascent: number
  descent: number
  lineGap: number
  unitsPerEm: number
  capHeight: number
}

export interface CapsizeStyles {
  fontSize: number
  lineHeight?: number
  marginTop: number
  marginBottom: number
  paddingTop: number
}

type CapHeightWithLeading = {
  capHeight: number
  leading?: number
  fontMetrics: FontMetrics
}

type CapHeightWithLineGap = {
  capHeight: number
  lineGap: number
  fontMetrics: FontMetrics
}

type FontSizeWithLeading = {
  fontSize: number
  leading?: number
  fontMetrics: FontMetrics
}

type FontSizeWithLineGap = {
  fontSize: number
  lineGap: number
  fontMetrics: FontMetrics
}

export type CapsizeOptions =
  | CapHeightWithLineGap
  | CapHeightWithLeading
  | FontSizeWithLineGap
  | FontSizeWithLeading

function capsize(options: CapHeightWithLeading): CapsizeStyles
function capsize(options: CapHeightWithLineGap): CapsizeStyles
function capsize(options: FontSizeWithLineGap): CapsizeStyles
function capsize(options: FontSizeWithLeading): CapsizeStyles

function capsize(options: CapsizeOptions) {
  if ('leading' in options && 'lineGap' in options) {
    throw new Error(
      'Only a single line height style can be provided. Please pass either `lineGap` OR `leading`.'
    )
  }

  if ('capHeight' in options && 'fontSize' in options) {
    throw new Error('Please pass either `capHeight` OR `fontSize`, not both.')
  }

  const { fontMetrics } = options
  const capHeightScale = fontMetrics.capHeight / fontMetrics.unitsPerEm

  let specifiedFontSize
  let specifiedCapHeight

  if ('capHeight' in options) {
    specifiedFontSize = options.capHeight / capHeightScale
    specifiedCapHeight = options.capHeight
  } else if ('fontSize' in options) {
    specifiedFontSize = options.fontSize
    specifiedCapHeight = options.fontSize * capHeightScale
  } else {
    throw new Error('Please pass either `capHeight` OR `fontSize`.')
  }

  let specifiedLineHeight

  if ('lineGap' in options) {
    specifiedLineHeight = specifiedCapHeight + options.lineGap
  } else if ('leading' in options) {
    specifiedLineHeight = options.leading
  }

  return createStyle({
    lineHeight: specifiedLineHeight,
    fontSize: specifiedFontSize,
    fontMetrics,
  })
}

interface CapsizeInternal {
  lineHeight?: number
  fontSize: number
  fontMetrics: FontMetrics
}

/*
   Rounding all values to a precision of `4` based on discovering that browser
   implementations of layout units fall between 1/60th and 1/64th of a pixel.

   Reference: https://trac.webkit.org/wiki/LayoutUnit
   (above wiki also mentions Mozilla - https://trac.webkit.org/wiki/LayoutUnit#Notes)

   TODO: Figure out how this works in React Native, leaving this here for now
*/
const PRECISION = 4

function createStyle({
  lineHeight,
  fontSize,
  fontMetrics,
}: CapsizeInternal): CapsizeStyles {
  const toScale = (value: number) => value / fontSize

  const absoluteDescent = Math.abs(fontMetrics.descent)
  const capHeightScale = fontMetrics.capHeight / fontMetrics.unitsPerEm
  const descentScale = absoluteDescent / fontMetrics.unitsPerEm
  const ascentScale = fontMetrics.ascent / fontMetrics.unitsPerEm
  const lineGapScale = fontMetrics.lineGap / fontMetrics.unitsPerEm

  const contentArea = fontMetrics.ascent + fontMetrics.lineGap + absoluteDescent
  const lineHeightScale = contentArea / fontMetrics.unitsPerEm
  const lineHeightNormal = lineHeightScale * fontSize

  const specifiedLineHeightOffset = lineHeight
    ? (lineHeightNormal - lineHeight) / 2
    : 0

  const leadingTrim = (value: number) =>
    value - toScale(specifiedLineHeightOffset)

  let style: CapsizeStyles = {
    fontSize: roundTo(fontSize, PRECISION),
    marginTop: roundTo(
      leadingTrim(ascentScale - capHeightScale + lineGapScale / 2) * -fontSize,
      PRECISION
    ),
    marginBottom: roundTo(
      leadingTrim(descentScale + lineGapScale / 2) * -fontSize -
        Math.max(0, specifiedLineHeightOffset),
      PRECISION
    ),
    paddingTop: roundTo(Math.max(0, specifiedLineHeightOffset), PRECISION),
  }

  if (lineHeight) {
    style = {
      ...style,
      lineHeight: roundTo(lineHeight, PRECISION),
    }
  }

  return style
}

export default capsize

export const getCapHeight = ({
  fontSize,
  fontMetrics,
}: {
  fontSize: number
  fontMetrics: FontMetrics
}) =>
  roundTo(
    (fontSize * fontMetrics.capHeight) / fontMetrics.unitsPerEm,
    PRECISION
  )
