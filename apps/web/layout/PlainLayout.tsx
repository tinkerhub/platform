import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Topbar, BottomBar } from '../components/Navbar';
import type { Child } from '../types';

export const LayoutPlain = ({ children }: Child) => (
  <Flex
    flexDirection="column"
    justifyContent="space-between"
    pl={{ base: '30px', md: '74px' }}
    pr={{ base: '30px', md: '73px' }}
    pt={{ base: '40px', md: '50px' }}
  >
    <Topbar showBtn={false} />
    {children}
    <BottomBar />
  </Flex>
);
