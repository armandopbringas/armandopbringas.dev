import Link from 'next/link'
import { Text, useColorModeValue } from '@chakra-ui/react'
import { MdOutlineAnalytics } from 'react-icons/md'
import styled from '@emotion/styled'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 0;

  > svg {
    transition: 200ms ease;
  }

  &:hover > svg {
    transform: rotate(20deg);
  }
`

const Logo = () => {
  return (
    <Link href="/" scroll={false}>
      <LogoBox>
        <MdOutlineAnalytics size={25} />
        <Text
          color={useColorModeValue('ink.800', 'paper.100')}
          fontFamily="'Familjen Grotesk', sans-serif"
          fontWeight="600"
          letterSpacing="-0.02em"
          ml={2}
        >
          Armando Bringas
        </Text>
      </LogoBox>
    </Link>
  )
}

export default Logo
