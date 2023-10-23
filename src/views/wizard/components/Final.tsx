/* eslint-disable react/style-prop-object */
/* eslint-disable react/no-unescaped-entities */
import {
  Center,
  Spinner,
  Heading,
  Box,
  useToast,
  Icon,
  Flex,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { MdOutlineContentCopy } from 'react-icons/md';
import { FiExternalLink } from 'react-icons/fi';
import { TiTick } from 'react-icons/ti';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';

import { Oops } from './Oops';
import Link from "next/link";

interface Prop {
  isLoading: boolean;
  id: string | undefined;
  error: boolean;
}

export const Final = ({ isLoading, id = 'ERROR', error }: Prop) => {
  const toast = useToast();
  const router = useRouter();
  const { colorMode } = useColorMode();

  const copyFile = () => {
    toast.promise(window.navigator.clipboard.writeText(id), {
        success: { title: 'Id copied to clipboard.', description: 'You can paste it now.' },
        error: { title: 'Error copying to clipboard.', description: 'Please try again.' },
        loading: { title: 'Copying to clipboard.', description: 'Please wait...' }
    });
  };

  if (isLoading) {
    return (
      <Center minH="550px" w="450px" p="35px" borderRadius="lg">
        <Flex flexDirection="column">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            alignSelf="center"
          />
        </Flex>
      </Center>
    );
  }

  if (error) {
    return <Oops />;
  }

  return (
    <Flex
      mt="30px"
      minH="400px"
      px="30px"
      w="full"
      justifyContent="space-around"
      borderRadius="lg"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Box pb="30px">
        <Center>
          <Icon
            w="20px"
            h="20px"
            borderRadius="full"
            as={TiTick}
            fontSize="18px"
            bg="rgba(34, 174, 115, 1)"
            color="white"
            mr="6px"
          />
          <Heading
            as="h2"
            size={{ base: 'sm', lg: 'md' }}
            textAlign="center"
            color="rgba(34, 174, 115, 1)"
          >
            Signup Successfull
          </Heading>
        </Center>
        <Heading as="h2" size={{ base: 'lg', lg: 'xl' }} textAlign="center" mt="15px">
          Welcome to TinkerHub
        </Heading>
        <Box border="1.5px solid #C8C8C8" mt="40px" borderRadius="lg" px="30px" w="100%">
          <Heading
            as="h3"
            size="md"
            fontSize="18px"
            fontWeight="450"
            p="4"
            textAlign="center"
            color={colorMode === 'light' ? 'rgba(116, 116, 116, 1)' : 'white'}
          >
            Your membership ID
          </Heading>
          <Box
            p="3"
            px="2"
            mb="10px"
            borderRadius="md"
            _hover={{ cursor: 'pointer' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={copyFile}
            height="40px"
          >
            <Heading fontWeight="500" size="14px" marginRight="14px" color="rgba(65, 83, 240, 1)">
              {id}
            </Heading>
            <Icon as={MdOutlineContentCopy} fontSize="18px" color="rgba(65, 83, 240, 1)" />
          </Box>
        </Box>
      </Box>
      <Box ml={{ md: '60px' }}>
        <Heading>Next Step</Heading>
        <Text>Come lets network with community people 🚀</Text>

        <Box
          border="1.5px solid #C8C8C8"
          p="3"
          borderRadius="md"
          mt="30px"
          pl="30px"
          position="relative"
        >
          <Center
            position="absolute"
            bg={colorMode === 'dark' ? '#1A202C' : 'white'}
            borderRadius="full"
            w="35px"
            h="35px"
            left="-19"
            top="6"
            border="1.5px solid #C8C8C8"
          >
            1
          </Center>
          <Heading size="md">Copy Membership ID</Heading>
          <Flex mt="15px" onClick={copyFile} _hover={{ cursor: 'pointer' }}>
            <Heading fontWeight="500" size="14px" marginRight="14px" color="rgba(65, 83, 240, 1)">
              {id}
            </Heading>
            <Icon as={MdOutlineContentCopy} fontSize="18px" color="rgba(65, 83, 240, 1)" />
          </Flex>
        </Box>
        <Box
          border="1.5px solid #C8C8C8"
          p="3"
          borderRadius="md"
          mt="30px"
          pl="30px"
          position="relative"
        >
          <Center
            position="absolute"
            bg={colorMode === 'dark' ? '#1A202C' : 'white'}
            borderRadius="full"
            w="35px"
            h="35px"
            left="-19"
            top="6"
            border="1.5px solid #C8C8C8"
          >
            2
          </Center>
          <Heading size="md">Go to TinkerHub discord</Heading>
          <Link href="https://discord.gg/67mmFMRvf8">
            <Flex
              mt="15px"
              onClick={copyFile}
              _hover={{ cursor: 'pointer' }}
              color="rgba(65, 83, 240, 1)"
            >
              <Heading fontWeight="500" size="14px" marginRight="14px">
                TinkerHub Discord
              </Heading>
              <Icon as={FiExternalLink} fontSize="18px" />
            </Flex>
          </Link>
        </Box>
        <Box
          border="1.5px solid #C8C8C8"
          p="3"
          borderRadius="md"
          mt="30px"
          pl="30px"
          position="relative"
        >
          <Center
            position="absolute"
            bg={colorMode === 'dark' ? '#1A202C' : 'white'}
            borderRadius="full"
            w="35px"
            h="35px"
            left="-19"
            top={{ base: '8', md: '12++', lg: '6' }}
            border="1.5px solid #C8C8C8"
          >
            3
          </Center>
          <Heading size="md">Verify your id on discord</Heading>
          <Flex mt="15px" onClick={copyFile} _hover={{ cursor: 'pointer' }}>
            <Text fontWeight="500" size="14px" marginRight="14px">
              Paste your membership ID in the{' '}
              <Text as="span" color="rgba(65, 83, 240, 1)">
                #verify-to-view-all-channels &nbsp;
              </Text>
              channel on discord
            </Text>
          </Flex>
        </Box>
        <Text mt="30px" fontWeight="400">
          And your're done ✅
        </Text>
        <Flex
          justifyContent="space-between"
          w="150px"
          mt="20px"
          onClick={() => router.push('/profile')}
          fontWeight="500"
          _hover={{ cursor: 'pointer' }}
        >
          <Icon as={BiArrowBack} fontSize="18px" alignSelf="center" color="rgba(65, 83, 240, 1)" />
          <Text color="rgba(65, 83, 240, 1)">Return To home</Text>
        </Flex>
      </Box>
    </Flex>
  );
};
