/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { authConfig } from '../auth';
import { theme } from '../theme';
import { AuthContext } from '../context';
import { Child } from '../types';

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    Layout?: (arg: Child) => JSX.Element;
  };
};

if (typeof window !== 'undefined') {
  SuperTokens.init(authConfig());
}

const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  return (
    <SuperTokensWrapper>
      <Head>
        <title>{path} / tinkerhub</title>
      </Head>
      <AuthContext>
        <ChakraProvider theme={theme}>
          {Component.Layout ? (
            <Component.Layout>
              <Component {...pageProps} />
            </Component.Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </ChakraProvider>
      </AuthContext>
    </SuperTokensWrapper>
  );
};

export default MyApp;
