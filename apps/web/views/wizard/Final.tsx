import { Center, Text, Spinner } from '@chakra-ui/react';
import React from 'react';

interface Prop {
  isLoading: boolean;
}

export const Final = ({ isLoading }: Prop) => {
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
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    );
  }

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
      <Text>Hello world!</Text>
    </Center>
  );
};
