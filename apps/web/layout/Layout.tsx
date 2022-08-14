import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { signOut } from 'supertokens-auth-react/recipe/passwordless';
import { Topbar, BottomBar } from '../components/Navbar';
import type { Child } from '../types';

export const Layout = ({ children }: Child) => {
  const noBtnPath = ['auth', 'wizard'];

  const { doesSessionExist } = useSessionContext() as any;
  const [btnState, setBtn] = useState<boolean>(true);
  const [txt, setTxt] = useState<string>('LogIn');

  const router = useRouter();
  useEffect(() => {
    const path = router.pathname;
    if (noBtnPath.some((el) => path.includes(el))) {
      setBtn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (doesSessionExist) {
      setTxt('LogOut');
    }
  }, [doesSessionExist]);

  const redirect = () => {
    router.push('/');
  };

  const LogOut = async () => {
    router.replace('/');
    await signOut();
    window.location.reload();
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      minH="100vh"
      p={{ base: '20px', sm: '30px', md: '74px' }}
      pr={{ base: '5px', md: '73px' }}
      pt={{ base: '40px', md: '50px' }}
    >
      <Topbar showBtn={btnState} btnText={txt} btnFunc={doesSessionExist ? LogOut : redirect} />
      {children}
      <BottomBar />
    </Flex>
  );
};

export default Layout;
