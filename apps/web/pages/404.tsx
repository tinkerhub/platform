import { Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import { Topbar, Footer } from '../layout/components';

const Error = () => (
  <Flex
    flexDirection="column"
    justifyContent="space-between"
    minH="100vh"
    p={{ base: '20px', sm: '30px', md: '74px' }}
    pt={{ base: '40px', md: '50px' }}
  >
    <Topbar showBtn={false} />
    <Image src="/404.svg" height="400" width="300" />
    <Heading textAlign="center" color="#407BFF" size="2xl">
      Looks Like You&apos;re Lost
    </Heading>
    <Heading textAlign="center" size="md" fontWeight="300" mt="20px">
      Here&apos;s is your way back to home
    </Heading>
    <Flex justifyContent="center" mt="20px">
      <Button variant="outline" mr="10px" outline="1px solid #407BFF">
        Home
      </Button>
      <Button
        ml="10px"
        bg="#407BFF"
        color="white
      "
        _hover={{ bg: '#407BFF' }}
      >
        My Profile
      </Button>
    </Flex>
    <Footer />
  </Flex>
);

export default Error;
