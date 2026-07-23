import { Box, HStack, Link, Text, useColorModeValue } from '@chakra-ui/react'

const Footer = () => {
  const mutedColor = useColorModeValue('blackAlpha.700', 'whiteAlpha.700')

  return (
    <Box as="footer" align="center" pt={12} pb={4}>
      <HStack spacing={4} justify="center" flexWrap="wrap" mb={3}>
        <Link href="https://github.com/armandopbringas" isExternal>
          GitHub
        </Link>
        <Link href="https://www.linkedin.com/in/armandopbringas/" isExternal>
          LinkedIn
        </Link>
        <Link
          href="https://wa.me/2727232016?text=Hola,%20me%20gustar%C3%ADa%20hablar%20sobre%20un%20proyecto%20web."
          isExternal
        >
          WhatsApp
        </Link>
      </HStack>
      <Text opacity={0.6} fontSize="sm" color={mutedColor}>
        © 2026 Armando Bringas. Todos los derechos reservados.
      </Text>
    </Box>
  )
}

export default Footer
