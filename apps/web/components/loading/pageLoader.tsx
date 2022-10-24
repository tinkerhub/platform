import { Center, Flex, Heading } from '@chakra-ui/react';
import { Pulse } from '../../animations/Loader';

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
