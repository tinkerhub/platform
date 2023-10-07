import { useRouter } from 'next/router';
import { Box, Flex } from '@chakra-ui/react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { Topbar, Footer } from './components';
import type { Child } from '../types';
import { useAuthCtx } from '../hooks';
import { PageLoader } from '../components/loading';

export const BaseLayout = ({ children }: Child) => {
  const router = useRouter();
  const { isUserLoading } = useAuthCtx();

  const redirect = () => {
    router.push('/auth');
  };

  const profileDirect = () => {
    router.push('/profile');
  };
  const path = router.pathname;

  const { doesSessionExist } = useSessionContext() as any;

  if (isUserLoading) {
    return (
      <Box>
        <PageLoader />
        <Box display="none">{children}</Box>
      </Box>
    );
  }

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      minH="100vh"
      p={{ base: '20px', sm: '30px', md: '55px' }}
      pt={{ base: '40px', md: '50px' }}
    >
      <Topbar
        showBtn={path === '/'}
        btnText={doesSessionExist ? 'My Profile' : 'Login'}
        btnFunc={doesSessionExist ? profileDirect : redirect}
      />
      {children}
      <Footer />
    </Flex>
  );
};
