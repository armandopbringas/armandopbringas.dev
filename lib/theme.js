import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode('paper.100', 'ink.900')(props),
      color: mode('ink.800', 'paper.100')(props)
    },
    '@keyframes dot-drift-left': {
      '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
      '50%': { transform: 'translate3d(10px, -6px, 0)' }
    },
    '@keyframes dot-drift-right': {
      '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
      '50%': { transform: 'translate3d(-10px, 6px, 0)' }
    },
    '@media (prefers-reduced-motion: reduce)': {
      '*': { animationDuration: '0.01ms !important', animationIterationCount: '1 !important' }
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
      color: mode('accent.500', 'accentDark.500')(props),
      textUnderlineOffset: 3
    })
  }
}

const fonts = {
  heading: "'Familjen Grotesk', sans-serif",
  body: "'Manrope', sans-serif"
}

const colors = {
  paper: {
    50: '#FFFFFF',
    100: '#F5F6FA',
    200: '#E8EAF0',
    300: '#D7DBE5'
  },
  sand: {
    50: '#FFFFFF',
    100: '#F5F6FA',
    200: '#E8EAF0',
    300: '#D7DBE5',
    400: '#C0C7D4'
  },
  ink: {
    600: '#45516A',
    700: '#273044',
    800: '#141A28',
    900: '#1F2021'
  },
  accent: {
    400: '#E6A16B',
    500: '#C96512',
    600: '#8C4208'
  },
  accentDark: {
    400: '#E6A16B',
    500: '#C96512',
    600: '#8C4208'
  }
}

const config = {
  initialColorMode: 'system',
  useSystemColorMode: true
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
