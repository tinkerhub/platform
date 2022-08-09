/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { authConfig } from '../auth';
import { theme } from '../theme';

if (typeof window !== 'undefined') {
  SuperTokens.init(authConfig());
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SuperTokensWrapper>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </SuperTokensWrapper>
);

export default MyApp;
