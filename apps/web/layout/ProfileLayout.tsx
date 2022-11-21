import { useRouter } from 'next/router';
import { Box, Flex } from '@chakra-ui/react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { signOut } from 'supertokens-auth-react/recipe/passwordless';
import { Topbar, Footer } from './components';
import type { Child } from '../types';
import { useAuthCtx } from '../hooks';
import { PageLoader } from '../components/loading';

export const ProfileLayout = ({ children }: Child) => {
  const router = useRouter();
  const { isUserLoading } = useAuthCtx();

  const logOut = async () => {
    localStorage.removeItem('isWizardCompleted');
    await signOut();
    router.replace('/');
  };

  if (isUserLoading) {
    return (
      <Box>
        <PageLoader />
        <Box display="none">{children}</Box>
      </Box>
    );
  }

  return (
    <SessionAuth>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        minH="100vh"
        p={{ base: '20px', sm: '30px', md: '74px' }}
        pt={{ base: '40px', md: '50px' }}
      >
        <Topbar showBtn btnText="LogOut" btnFunc={logOut} />
        {children}
        <Footer />
      </Flex>
    </SessionAuth>
  );
};
