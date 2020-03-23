import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '15px',
  baseLineHeight: 1.5,
  headerFontFamily: ['PT Sans', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Source Serif Pro'],
  // See below for the full list of options.
})

// Output CSS as string.
typography.toString()

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
