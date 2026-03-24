import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode('sand.100', '#1D2021')(props),
      color: mode('ink.800', 'whiteAlpha.900')(props)
    }
  })
}

const components = {
  Heading: {
    variants: {
      'section-title': props => ({
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: mode('ink.700', 'sand.400')(props),
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4
      })
    }
  },
  Link: {
    baseStyle: props => ({
      color: mode('accent.600', 'accent.500')(props),
      textUnderlineOffset: 3
    })
  }
}

const fonts = {
  heading: "'M PLUS Rounded 1c'"
}

const colors = {
  grassTeal: '#41A6B5',
  sand: {
    50: '#FBF6F0',
    100: '#F6EFE6',
    200: '#EFE4D6',
    300: '#E5D5C2',
    400: '#D7C2A7'
  },
  ink: {
    700: '#2A231E',
    800: '#1F1A17',
    900: '#161210'
  },
  accent: {
    500: '#E07A1F',
    600: '#C86612'
  }
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
