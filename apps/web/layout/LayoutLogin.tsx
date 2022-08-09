import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import { Topbar, BottomBar } from '../components/Navbar';
import type { Child } from '../types';

export const LayoutLogin = ({ children }: Child) => {
  const router = useRouter();
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      pl={{ base: '30px', md: '74px' }}
      pr={{ base: '30px', md: '73px' }}
      pt={{ base: '40px', md: '50px' }}
    >
      <Topbar btnText="Login/Signup" showBtn btnFunc={() => router.push('/auth')} />
      {children}
      <BottomBar />
    </Flex>
  );
};
