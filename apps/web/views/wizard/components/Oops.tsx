import { Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';

export const Oops = () => (
  <Flex
    flexDirection="column"
    justifyContent="space-between"
    minH="100vh"
    p={{ base: '20px', sm: '30px', md: '74px' }}
    pt={{ base: '40px', md: '50px' }}
  >
    <Image src="/oops.svg" height="400" width="300" />
    <Heading textAlign="center" color="#407BFF" size="2xl" mb={{ base: '20px', lg: '10px' }}>
      Oops... Something Went Wrong
    </Heading>
    <Heading textAlign="center" size="md" fontWeight="300" mb={{ base: '20px', lg: '10px' }}>
      It’s alright, Please try again.
    </Heading>
    <Flex justifyContent="center">
      <Button variant="outline" mr="10px" outline="1px solid #407BFF">
        Home
      </Button>
    </Flex>
  </Flex>
);
