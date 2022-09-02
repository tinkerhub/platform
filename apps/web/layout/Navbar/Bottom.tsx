import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export const BottomBar = () => (
  <Box>
    <Divider orientation="horizontal" bgColor="rgba(177, 177, 177, 1)" width="60.5%" height="1px" />
    <Text color="rgba(177, 177, 177, 1)" mt="20px" maxW="900px" fontSize="18px">
      We are a community of tinkerers, makers, policy geeks & students and are working towards
      mapping and empowering people who share a passion to innovate.
    </Text>
    <Flex justifyContent="space-between" mt={{ base: '20px', xl: '41px' }}>
      <Text color="rgba(177, 177, 177, 1)" _hover={{ cursor: 'pointer', color: 'grey' }}>
        tinkerhub.org
      </Text>
      <Flex
        flexDirection="row"
        justifyContent={{ base: 'space-around', md: 'space-between' }}
        minW="250px"
      >
        <Text color="rgba(177, 177, 177, 1)" _hover={{ cursor: 'pointer', color: 'grey' }}>
          philosophy
        </Text>
        <Text color="rgba(177, 177, 177, 1)" _hover={{ cursor: 'pointer', color: 'grey' }}>
          code of conduct
        </Text>
      </Flex>
    </Flex>
  </Box>
);
