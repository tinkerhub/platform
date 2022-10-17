import React, { useEffect, useReducer } from 'react';
import Router, { useRouter } from 'next/router';
import { Box, Flex } from '@chakra-ui/react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { signOut, PasswordlessAuth } from 'supertokens-auth-react/recipe/passwordless';
import { Topbar, BottomBar } from './Navbar';
import type { Child } from '../types';
import { ActionKind, AuthReducer } from './reducer';
import { useAuthCtx } from '../hooks';
import { PageLoader } from '../components/loading';

export const Layout = ({ children }: Child) => {
  const router = useRouter();
  const { isUserLoading, setUserLoading } = useAuthCtx();
  // const isUserLoading = true;

  const redirect = () => {
    router.push('/auth');
  };
  const logOut = async () => {
    await signOut();
    router.replace('/');
  };
  const profileDirect = () => {
    router.push('/profile');
  };
  const path = router.pathname;
  const base = path.split('/')[1];

  const [reducer, dispatch] = useReducer(AuthReducer, {
    btnText: 'Login',
    showBtn: true,
    btnFunction: redirect,
  });

  const noBtnPath = ['auth', 'wizard'];
  const { doesSessionExist } = useSessionContext() as any;

  useEffect(() => {
    if (!doesSessionExist) {
      dispatch({ type: ActionKind.No_AUTH, payload: redirect });
    }

    if (doesSessionExist && path !== '/') {
      dispatch({ type: ActionKind.Auth_OtherPage, payload: logOut });
    }

    if (doesSessionExist && path === '/') {
      dispatch({ type: ActionKind.Auth_AND_BASE, payload: profileDirect });
    }

    if (noBtnPath.some((el) => base === el)) {
      dispatch({ type: ActionKind.NO_BTN_PATH, payload: logOut });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doesSessionExist, router]);

  // listening for route change events
  Router.events.on('routeChangeStart', () => {
    // when route change loading screen popup
    setUserLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setUserLoading(false);
  });

  // that loading screen

  if (isUserLoading) {
    return (
      <Box>
        <PageLoader />
        <Box display="none">{children}</Box>
      </Box>
    );
  }

  if (path === '/' || base === 'auth') {
    return (
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        minH="100vh"
        p={{ base: '20px', sm: '30px', md: '74px' }}
        pt={{ base: '40px', md: '50px' }}
      >
        <Topbar showBtn={reducer.showBtn} btnText={reducer.btnText} btnFunc={reducer.btnFunction} />
        {children}
        <BottomBar />
      </Flex>
    );
  }
  // protecting the route
  return (
    <PasswordlessAuth>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        minH="100vh"
        p={{ base: '20px', sm: '30px', md: '74px' }}
        pt={{ base: '40px', md: '50px' }}
      >
        <Topbar showBtn={reducer.showBtn} btnText={reducer.btnText} btnFunc={reducer.btnFunction} />
        {children}
        <BottomBar />
      </Flex>
    </PasswordlessAuth>
  );
};

export default Layout;
