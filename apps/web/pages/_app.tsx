/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { authConfig } from '../auth';
import { theme } from '../theme';
import { Layout } from '../layout';

if (typeof window !== 'undefined') {
  SuperTokens.init(authConfig());
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SuperTokensWrapper>
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  </SuperTokensWrapper>
);

export default MyApp;
