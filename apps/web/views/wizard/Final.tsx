/* eslint-disable react/style-prop-object */
/* eslint-disable react/no-unescaped-entities */
import {
  Center,
  Spinner,
  Heading,
  Box,
  Button,
  useToast,
  Icon,
  Flex,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useAuthCtx } from '../../hooks';

interface Prop {
  isLoading: boolean;
  id: string | undefined;
}

export const Final = ({ isLoading, id = 'ERROR' }: Prop) => {
  const toast = useToast();
  const router = useRouter();
  const [result, setResult] = useState<boolean>(false);
  const { getData } = useAuthCtx();
  // let test = true;
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setResult(true);
      }, 4000);
    }
  }, [isLoading]);

  const goHome = async () => {
    router.replace('/profile');
    await getData();
  };
  const copyFile = () => {
    window.navigator.clipboard.writeText(id);
    toast({
      title: 'Id copied to clipboard.',
      status: 'success',
      duration: 1000,
      isClosable: true,
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
  if (!isLoading && result) {
    return (
      <Center mt="30px" minH="400px" borderRadius="lg">
        <Box padding="30px" width="100%">
          <Heading as="h2" size="2xl" textAlign="left">
            Welcome to the{' '}
            <Text as="span" color="rgba(65, 82, 240, 1)">
              #Tinkerhub
            </Text>
          </Heading>
          <Box border="1.5px solid #C8C8C8" mt="40px" p="40px" borderRadius="lg">
            <Heading
              as="h3"
              size="md"
              fontSize="18px"
              fontWeight="450"
              mt="30px"
              textAlign="center"
              color="rgba(116, 116, 116, 1)"
            >
              Your membership ID
            </Heading>
            <Box
              py="3"
              px="2"
              mt="14px"
              borderRadius="md"
              fontSize="19px"
              _hover={{ cursor: 'pointer' }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={copyFile}
              height="40px"
            >
              <Heading fontWeight="500" size="14px" marginRight="14px">
                {id}
              </Heading>
              <Icon as={MdOutlineContentCopy} fontSize="18px" />
            </Box>
            <Flex
              justifyContent="space-around"
              mt="20px"
              flexDirection={{ base: 'column', lg: 'row' }}
            >
              <Button
                colorScheme="white"
                // borderColor="rgba(65, 83, 240, 1)"
                height="40px"
                borderWidth="3px"
                py="10px"
                px="20px"
                mt="14px"
                bg="white"
                color="black"
                fontSize="20px"
                _hover={{ cursor: 'pointer', borderColor: '#4299e1' }}
                onClick={goHome}
              >
                Continue to Home
              </Button>
              <Button
                colorScheme="blue"
                bg="rgba(65, 83, 240, 1)"
                py="3"
                px="20px"
                mt="14px"
                fontSize="20px"
                color="white"
                height="40px"
              >
                Continue to Discord
              </Button>
            </Flex>
          </Box>
        </Box>
      </Center>
    );
  }

  return (
    <Center mt="30px" minH="400px" p="35px" borderRadius="lg" _hover={{ cursor: 'not-allowed' }}>
      <iframe
        src="https://embed.lottiefiles.com/animation/54141"
        title="finak"
        width="400"
        height="400"
      />
    </Center>
  );
};
