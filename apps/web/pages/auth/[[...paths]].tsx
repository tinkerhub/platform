import { Center, Flex, Spinner } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import SuperTokens from 'supertokens-auth-react';
import { redirectToAuth } from 'supertokens-auth-react/recipe/passwordless';

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

  if (!SuperTokensComponentNoSSR) {
    return (
      <Center
        minH="550px"
        w="450px"
        bg="white"
        p="35px"
        borderRadius="lg"
        borderColor="rgba(200, 200, 200, 1)"
        borderWidth=".5px"
        mb="90px"
      >
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    );
  }

  return (
    <Flex
      flexDirection={{ base: 'column', lg: 'row' }}
      w="100%"
      justifyContent="space-around"
      mt="80px"
      mb="120px"
    >
      <SuperTokensComponentNoSSR />
    </Flex>
  );
};

export default Auth;
