/* eslint-disable react/no-unescaped-entities */
import { Center, Spinner, Heading, Box, Button, useToast, Icon, Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useAuthCtx } from '../../hooks';

interface Prop {
  isLoading: boolean;
  id: string | undefined;
  stopConfetti: React.Dispatch<boolean>;
}

export const Final = ({ isLoading, id = 'ERROR', stopConfetti }: Prop) => {
  const toast = useToast();
  const router = useRouter();
  const { getData } = useAuthCtx();

  useEffect(() => {
    setTimeout(() => {
      stopConfetti(true);
    }, 15000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <Center mt="30px" minH="400px" p="35px" borderRadius="lg">
      <Box padding="30" width="100%">
        <Heading as="h2" size="xl" textAlign="left">
          Thank You
        </Heading>
        <Heading as="h3" size="md" textAlign="left" fontSize="18px" fontWeight="450" mt="30px">
          Here's your membership ID
        </Heading>
        <Box
          bg="rgba(240, 240, 240, 1)"
          py="3"
          px="2"
          mt="14px"
          borderRadius="md"
          fontSize="19px"
          _hover={{ cursor: 'pointer' }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          onClick={copyFile}
          height="40px"
        >
          <Heading fontWeight="bold" size="14px" color="black">
            {id}
          </Heading>
          <Icon as={MdOutlineContentCopy} fontSize="25px" color="black" />
        </Box>
        <Button
          colorScheme="blue"
          bg="rgba(65, 83, 240, 1)"
          py="3"
          px="2"
          width="100%"
          mt="14px"
          fontSize="20px"
          color="white"
          height="40px"
        >
          Continue to Discord
        </Button>
        <Button
          colorScheme="white"
          // borderColor="rgba(65, 83, 240, 1)"
          height="40px"
          borderWidth="3px"
          py="3"
          px="2"
          width="100%"
          mt="14px"
          bg="white"
          color="black"
          fontSize="20px"
          _hover={{ cursor: 'pointer', borderColor: '#4299e1' }}
          onClick={goHome}
        >
          Continue to Home
        </Button>
      </Box>
    </Center>
  );
};
