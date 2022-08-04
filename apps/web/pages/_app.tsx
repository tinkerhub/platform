/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { WizardContextProvider } from '../context/wizardContext';
import { authConfig } from '../auth';

if (typeof window !== 'undefined') {
  SuperTokens.init(authConfig());
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SuperTokensWrapper>
    <WizardContextProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </WizardContextProvider>
  </SuperTokensWrapper>
);

export default MyApp;
