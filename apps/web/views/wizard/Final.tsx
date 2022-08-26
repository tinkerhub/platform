/* eslint-disable react/no-unescaped-entities */
import { Center, Spinner, Heading, Box, Button, useToast, Text } from '@chakra-ui/react';
import React from 'react';
import { CopyIcon } from '@chakra-ui/icons';

interface Prop {
  isLoading: boolean;
  id: number;
}

export const Final = ({ isLoading, id }: Prop) => {
  const toast = useToast();
  const copyFile = () => {
    toast({
      title: 'Id copied to clipboard.',
      status: 'success',
      duration: 1000,
      isClosable: true,
    });
  };

  if (isLoading) {
    return (
      <Center
        minH="550px"
        w="450px"
        bg="white"
        p="35px"
        borderRadius="lg"
        borderColor="rgba(200, 200, 200, 1)"
        borderWidth=".5px"
      >
        <Text as="h5" color="black">
          Loading...
        </Text>
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    );
  }

  return (
    <Center
      mt="30px"
      minH="550px"
      w="450px"
      bg="white"
      p="35px"
      borderRadius="lg"
      borderColor="rgba(200, 200, 200, 1)"
      borderWidth=".5px"
    >
      <Box padding="30" height="290px" width="100%">
        <Heading as="h2" size="xl" textAlign="left" color="black">
          Thank You
        </Heading>
        <Heading
          as="h3"
          size="md"
          textAlign="left"
          fontSize="18px"
          fontWeight="450"
          mt="10px"
          color="black"
        >
          Here's your membership ID
        </Heading>
        <Box
          bg="rgba(210, 210, 210, 1)"
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
        >
          <Heading fontWeight="bold" size="md" color="black">
            {id}
          </Heading>
          <CopyIcon fontSize="25px" color="black" />
        </Box>
        <Button
          colorScheme="blue"
          bg="rgba(65, 83, 240, 1)"
          py="3"
          px="2"
          width="100%"
          mt="14px"
          fontSize="20px"
        >
          Continue to Discord
        </Button>
        <Button
          colorScheme="white"
          borderColor="rgba(65, 83, 240, 1)"
          borderWidth="3px"
          py="3"
          px="2"
          width="100%"
          mt="14px"
          color="black"
          fontSize="20px"
          _hover={{ cursor: 'pointer', borderColor: '#4299e1' }}
        >
          Continue to Home
        </Button>
      </Box>
    </Center>
  );
};
