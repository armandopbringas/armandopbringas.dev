import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    html: {
      bg: mode('paper.100', 'ink.900')(props)
    },
    body: {
      bg: mode('paper.100', 'ink.900')(props),
      color: mode('ink.800', 'paper.100')(props),
      minHeight: '100vh'
    },
    '#__next': {
      position: 'relative',
      zIndex: 1
    },
    'body::before, body::after': {
      content: '""',
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      backgroundRepeat: 'repeat',
      backgroundAttachment: 'fixed',
      backgroundImage: mode(
        'radial-gradient(circle, rgba(39, 48, 68, 0.28) 0.75px, transparent 1px)',
        'radial-gradient(circle, rgba(245, 246, 250, 0.34) 0.75px, transparent 1px)'
      )(props),
      backgroundSize: '18px 18px',
      maskImage:
        'radial-gradient(ellipse 74% 36% at 18% 22%, black 0%, rgba(0, 0, 0, 0.74) 43%, transparent 100%)',
      WebkitMaskImage:
        'radial-gradient(ellipse 74% 36% at 18% 22%, black 0%, rgba(0, 0, 0, 0.74) 43%, transparent 100%)'
    },
    'body::after': {
      backgroundPosition: '9px 7px',
      maskImage:
        'radial-gradient(ellipse 74% 38% at 78% 72%, black 0%, rgba(0, 0, 0, 0.7) 43%, transparent 100%)',
      WebkitMaskImage:
        'radial-gradient(ellipse 74% 38% at 78% 72%, black 0%, rgba(0, 0, 0, 0.7) 43%, transparent 100%)'
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
