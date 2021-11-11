import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Link,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Spacer,
  Text,
} from '@chakra-ui/react'
// import Image from 'next/image'

import HeroImg from '../../assets/hero-img-4.png'

export const Hero = () => (
  <Container maxW={'5xl'} h="full">
    <Stack
      h="full"
      textAlign={'center'}
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      pt={{ base: 32, md: 40 }}
      pb={{ base: 10, md: 14 }}
    >
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
        lineHeight={'110%'}
      >
        The{' '}
        <Text as={'span'} color={'orange.400'}>
          Decentralized
        </Text>{' '}
        Reserve Currency
      </Heading>
      <Text color={'gray.500'} maxW={'3xl'} fontSize="xl">
        BabelDAO is building a community-owned decentralized financial
        infrastructure to bring more stability and transparency for the world.
      </Text>
      <Stack spacing={6} direction={'row'}>
        <Button
          as={Link}
          rounded="full"
          px={6}
          colorScheme="orange"
          bg="orange.400"
          size="lg"
          _hover={{ bg: 'orange.500' }}
          href="https://app.babeldao.finance"
          isExternal
        >
          Enter App
        </Button>
        <Button
          as={Link}
          rounded={'full'}
          px={6}
          size="lg"
          href="https://doc.babeldao.finance"
          isExternal
        >
          Documentation
        </Button>
      </Stack>
      <Box w="100%" maxW="2xl">
        <Image src={HeroImg} alt="" />
      </Box>
      <Spacer w={'full'} />
      <StatGroup w="full">
        <Stat
          flexBasis={{ base: '100%', md: '25%' }}
          mb={{ base: 2, md: 0 }}
          size="xl"
        >
          <StatLabel fontSize={{ base: 'xl', md: 'lg' }}>
            Total BABEL Staked
          </StatLabel>
          <StatNumber fontSize={{ base: '4xl', md: '3xl' }}>91.1%</StatNumber>
        </Stat>

        <Stat flexBasis={{ base: '100%', md: '25%' }} mb={{ base: 2, md: 0 }}>
          <StatLabel fontSize={{ base: 'xl', md: 'lg' }}>
            Treasury Balance
          </StatLabel>
          <StatNumber fontSize={{ base: '4xl', md: '3xl' }}>
            $643,430,570
          </StatNumber>
        </Stat>

        <Stat flexBasis={{ base: '100%', md: '25%' }} mb={{ base: 2, md: 0 }}>
          <StatLabel fontSize={{ base: 'xl', md: 'lg' }}>
            Total Value Locked
          </StatLabel>
          <StatNumber fontSize={{ base: '4xl', md: '3xl' }}>
            $3,520,544,451
          </StatNumber>
        </Stat>

        <Stat flexBasis={{ base: '100%', md: '25%' }} mb={{ base: 2, md: 0 }}>
          <StatLabel fontSize={{ base: 'xl', md: 'lg' }}>Current APY</StatLabel>
          <StatNumber fontSize={{ base: '4xl', md: '3xl' }}>8,199%</StatNumber>
        </Stat>
      </StatGroup>
    </Stack>
  </Container>
)
