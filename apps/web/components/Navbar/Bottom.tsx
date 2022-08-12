import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export const BottomBar = () => (
  <Box pb={10} mt={{ base: '0px', sm: '0px', '2xl': '10px' }}>
    <Divider
      orientation="horizontal"
      bgColor="rgba(177, 177, 177, 1)"
      mt={{ base: '220px', sm: '60px', xl: '65px', '2xl': '170px' }}
      width="60.5%"
      height="1px"
    />
    <Text color="rgba(177, 177, 177, 1)" mt="20px" maxW="900px" fontSize="18px">
      We are a community of tinkerers, makers, policy geeks & students and are working towards
      mapping and empowering people who share a passion to innovate.
    </Text>
    <Flex bg="white" justifyContent="space-between" mt={{ base: '20px', xl: '41px' }}>
      <Text color="rgba(177, 177, 177, 1)" _hover={{ cursor: 'pointer', color: 'grey' }}>
        tinkerhub.org
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
  </Box>
);
