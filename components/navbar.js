import Logo from './logo'
import {
  Container,
  Box,
  Flex,
  useColorModeValue
} from '@chakra-ui/react'
import ThemeToggleButton from './theme-toggle-button'
import AudioToggle from './AudioToggle'
import LanguageToggleButton from './language-toggle-button'

const Navbar = props => {
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('rgba(245,246,250,0.94)', 'ink.900')}
      borderBottomWidth="1px"
      borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.200')}
      zIndex={2}
      {...props}
    >
      <Container py={3} px={{ base: 4, md: 6 }} maxW="container.lg" width="100%" display="flex" justifyContent="space-between">
        <Flex align="center" mr={5}>
          <Box as="div" fontSize="lg" letterSpacing="tighter">
            <Logo />
          </Box>
        </Flex>

        <Box display="flex" alignItems="center" gap="1rem">
          <AudioToggle />
          <LanguageToggleButton />
          <ThemeToggleButton />
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
