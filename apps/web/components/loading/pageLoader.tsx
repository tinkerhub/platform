import { Center, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { Pulse } from '../../animations/loader';

export const PageLoader = () => (
  <Pulse>
    <Center height="100vh">
      <Flex flexDirection="column">
        <Flex>
          <Heading size="2xl">Tinker</Heading>
          <Heading fontWeight="normal" size="2xl">
            Hub
          </Heading>
        </Flex>
        <Heading fontSize="xl" fontWeight="500">
          Foundation
        </Heading>
      </Flex>
    </Center>
  </Pulse>
);
