import { forwardRef } from 'react'
import Logo from './logo'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'
import AudioToggle from './AudioToggle'
import LanguageToggleButton from './language-toggle-button'
import { useLanguage } from './language-context'

const MenuLink = forwardRef((props, ref) => (
  <Link ref={ref} as={NextLink} {...props} />
))

const Navbar = props => {
  const { t } = useLanguage()

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

          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <MenuItem as={MenuLink} href="/">
                  {t.nav.mobileAbout}
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
