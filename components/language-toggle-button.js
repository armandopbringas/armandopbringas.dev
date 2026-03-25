import { IconButton, useColorModeValue } from '@chakra-ui/react'
import { useLanguage } from './language-context'

const LanguageToggleButton = () => {
  const { language, toggleLanguage } = useLanguage()
  const color = useColorModeValue('ink.700', 'sand.400')
  const borderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
  const hoverBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')

  return (
    <IconButton
      aria-label={language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
      size="sm"
      variant="ghost"
      bg="transparent"
      color={color}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="8px"
      _hover={{ bg: hoverBg }}
      _active={{ bg: hoverBg }}
      onClick={toggleLanguage}
      fontSize="xs"
      fontWeight="bold"
      icon={<span>{language === 'es' ? 'EN' : 'ES'}</span>}
    />
  )
}

export default LanguageToggleButton
