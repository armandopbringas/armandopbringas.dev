import {
  ChakraProvider,
  createLocalStorageManager
} from '@chakra-ui/react'
import theme from '../lib/theme'

// A new key ignores the time-based preference persisted by earlier versions.
const colorModeManager = createLocalStorageManager('armandopbringas-color-mode')

export default function Chakra({ children }) {
  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  )
}

// Kept for pages that re-export this loader; color mode now resolves on the client.
export async function getServerSideProps() {
  return { props: {} }
}
