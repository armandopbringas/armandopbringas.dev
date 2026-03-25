import { AnimatePresence, motion } from 'framer-motion'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode()

  const iconColor = useColorModeValue('accent.600', 'accent.500')
  const borderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
  const hoverBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={useColorModeValue('light', 'dark')}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          aria-label="Toggle theme"
          size="sm"
          variant="ghost"
          bg="transparent"
          color={iconColor}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="8px"
          _hover={{ bg: hoverBg }}
          _active={{ bg: hoverBg }}
          icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
          onClick={toggleColorMode}
        ></IconButton>
      </motion.div>
    </AnimatePresence>
  )
}

export default ThemeToggleButton
