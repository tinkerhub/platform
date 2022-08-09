import { Flex } from '@chakra-ui/react';
import { signOut } from 'supertokens-auth-react/recipe/passwordless';
import { useRouter } from 'next/router';
import React from 'react';
import { Topbar, BottomBar } from '../components/Navbar';
import type { Child } from '../types';

export const LayoutSignOut = ({ children }: Child) => {
  const router = useRouter();
  const LogOut = async () => {
    await signOut();
    router.replace('/');
  };
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      pl={{ base: '30px', md: '74px' }}
      pr={{ base: '30px', md: '73px' }}
      pt={{ base: '40px', md: '50px' }}
    >
      <Topbar showBtn btnText="Log Out" btnFunc={LogOut} />
      {children}
      <BottomBar />
    </Flex>
  );
};
