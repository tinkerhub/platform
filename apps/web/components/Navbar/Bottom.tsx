import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

export const BottomBar = () => (
  <Flex bg="white" justifyContent="space-between" mt={{ base: '40px', xl: '170px' }}>
    <Text color="rgba(177, 177, 177, 1)" _hover={{ cursor: 'pointer', color: 'grey' }}>
      Tinkerhub.org
    </Text>
    <Flex flexDirection="row" justifyContent="space-between" minW="250px">
      <Text color="rgba(177, 177, 177, 1)" _hover={{ cursor: 'pointer', color: 'grey' }}>
        Philosophy
      </Text>
      <Text color="rgba(177, 177, 177, 1)" _hover={{ cursor: 'pointer', color: 'grey' }}>
        Code of Conduct
      </Text>
    </Flex>
  </Flex>
);
