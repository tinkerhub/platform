import { Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import SuperTokens from 'supertokens-auth-react';
import { redirectToAuth } from 'supertokens-auth-react/recipe/passwordless';
import { LayoutPlain } from '../../layout';

const SuperTokensComponentNoSSR = dynamic(
  // eslint-disable-next-line no-promise-executor-return
  new Promise((res) => res(SuperTokens.getRoutingComponent)) as any,
  { ssr: false }
);

const Auth: NextPage = () => {
  // redirect to "/auth" page if "/auth/random" route occur
  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      redirectToAuth();
    }
  }, []);

  return (
    <LayoutPlain>
      <Flex
        flexDirection={{ base: 'column', lg: 'row' }}
        w="100%"
        justifyContent="space-around"
        mt="80px"
      >
        <SuperTokensComponentNoSSR />
      </Flex>
    </LayoutPlain>
  );
};

export default Auth;
