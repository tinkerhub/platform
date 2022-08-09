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
      minH="95vh"
      pl="74px"
      pr="73px"
      pt="50px"
    >
      <Topbar showBtn btnText="Log Out" btnFunc={LogOut} />
      {children}
      <BottomBar />
    </Flex>
  );
};
