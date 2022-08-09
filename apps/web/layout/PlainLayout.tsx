import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Topbar, BottomBar } from '../components/Navbar';
import type { Child } from '../types';

export const LayoutPlain = ({ children }: Child) => (
  <Flex
    flexDirection="column"
    justifyContent="space-between"
    minH="95vh"
    pl="74px"
    pr="73px"
    pt="50px"
  >
    <Topbar showBtn={false} />
    {children}
    <BottomBar />
  </Flex>
);
