import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Link,
  Stack,
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
    </Stack>
  </Container>
)
