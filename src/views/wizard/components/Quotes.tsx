import { Box, Flex, Heading } from '@chakra-ui/react';
import { Child } from '../../../types';

interface Word extends Child {
  word: string;
}

export const Quotes = ({ word, children }: Word) => (
  <Flex
    // mb="80px"
    justifyContent="space-between"
    flexDirection={{ base: 'column', lg: 'row' }}
    alignItems={{ base: 'center', lg: 'normal' }}
  >
    <Box>{children}</Box>
    <Box width="50%" display={{ base: 'none', lg: 'block' }}>
      <Heading color="#4153F0" mt="100px" fontWeight="400">
        We want to change this
      </Heading>
      <Heading mt="15px" fontWeight="300" fontSize="33px">
        {word}
      </Heading>
    </Box>
  </Flex>
);
