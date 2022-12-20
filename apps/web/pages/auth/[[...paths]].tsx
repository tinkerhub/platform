import { Box, Center } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import SuperTokens from 'supertokens-auth-react';
import { redirectToAuth } from 'supertokens-auth-react/recipe/passwordless';
import { BaseLayout } from '../../layout';

const SuperTokensComponentNoSSR = dynamic(
  // eslint-disable-next-line no-promise-executor-return
  new Promise((res) => res(SuperTokens.getRoutingComponent)) as any,
  { ssr: false }
);

const Auth = () => {
  // redirect to "/auth" page if "/auth/random" route occur
  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      redirectToAuth();
    }
  }, []);

  return (
    <Center mb="100px" mt="30px">
      <Box
        borderRadius="lg"
        borderColor={{ base: 'none', lg: 'rgba(200, 200, 200, 1)' }}
        borderWidth={{ base: 'none', lg: '.5px' }}
      >
        <SuperTokensComponentNoSSR />
      </Box>
    </Center>
  );
};

Auth.Layout = BaseLayout;

export default Auth;
