import NextLink from 'next/link'
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button
} from '@chakra-ui/react'

const ServerError = ({ locale }) => {
  const isSpanish = locale === 'es'

  return (
    <Container>
      <Heading as="h1">
        {isSpanish ? 'Algo salió mal' : 'Something went wrong'}
      </Heading>
      <Text>
        {isSpanish
          ? 'No pudimos completar esa solicitud. Inténtalo de nuevo.'
          : 'We couldn\'t complete that request. Please try again.'}
      </Text>
      <Divider my={6} />
      <Box my={6} align="center">
        <Button as={NextLink} href="/" colorScheme="teal">
          {isSpanish ? 'Volver al inicio' : 'Return to home'}
        </Button>
      </Box>
    </Container>
  )
}

// Create the localized 500 pages during the Next.js build. Vercel can then
// package them without attempting to generate the same output a second time.
export async function getStaticProps({ locale }) {
  return { props: { locale } }
}

export default ServerError
