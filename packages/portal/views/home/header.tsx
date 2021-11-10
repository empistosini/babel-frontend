import { VFC } from 'react'
import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Link,
  List,
  ListIcon,
  ListItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import Image from 'next/image'
import { ExternalLinkIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa'

import Logo from '../../assets/logo-single.png'

export const Header: VFC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Center as="header" w="full" position="absolute" top="0" left="0">
      <HStack
        w="full"
        maxW="8xl"
        h="16"
        mx="auto"
        px={{ base: 4, md: 8, xl: 16 }}
        py={{ base: 12, md: 16 }}
        alignItems="center"
      >
        <Box className="w-24">
          <Image src={Logo} alt="BabelDAO Logo" objectFit="cover" />
        </Box>
        <Spacer />
        <IconButton
          variant="ghost"
          icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
          aria-label="Toggle Color Mode"
          onClick={() => toggleColorMode()}
        />
        <Spacer maxW="0.5" />
        <Popover trigger="hover" placement="bottom-end">
          <PopoverTrigger>
            <Button variant="unstyled">Social</Button>
          </PopoverTrigger>
          <PopoverContent boxSize="48" h="auto">
            <PopoverBody px={0}>
              <List spacing="2">
                <ListItem
                  _hover={{
                    bgColor: useColorModeValue('gray.200', 'gray.600'),
                  }}
                >
                  <HStack
                    as={Link}
                    w="full"
                    h="10"
                    px="4"
                    align="center"
                    href="https://github.com/BabelDAO"
                    isExternal
                  >
                    <ListIcon as={FaGithub} />
                    <Text as="span">Github</Text>
                    <Icon as={ExternalLinkIcon} />
                  </HStack>
                </ListItem>

                <ListItem
                  _hover={{
                    bgColor: useColorModeValue('gray.200', 'gray.600'),
                  }}
                >
                  <HStack
                    as={Link}
                    w="full"
                    h="10"
                    px="4"
                    align="center"
                    href="https://twitter.com/babeldao"
                    isExternal
                  >
                    <ListIcon as={FaTwitter} />
                    <Text as="span">Twitter</Text>
                    <Icon as={ExternalLinkIcon} />
                  </HStack>
                </ListItem>
                <ListItem
                  _hover={{
                    bgColor: useColorModeValue('gray.200', 'gray.600'),
                  }}
                >
                  <HStack
                    as={Link}
                    w="full"
                    h="10"
                    px="4"
                    align="center"
                    href="https://discord.gg/8FHqKeqD"
                    isExternal
                  >
                    <ListIcon as={FaDiscord} />
                    <Text as="span">Discord</Text>
                    <Icon as={ExternalLinkIcon} />
                  </HStack>
                </ListItem>
              </List>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Center>
  )
}
