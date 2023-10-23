import type {JSX} from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { theme } from '@/theme';
import { Child } from '@/types';
import Head from 'next/head';

type ComponentWithPageLayout = AppProps & {
    Component: AppProps['Component'] & {
        Layout?: (arg: Child) => JSX.Element;
    };
};

const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => {
    return (
        <>
            <Head>
                <title>TinkerHub</title>
            </Head>
            <ChakraProvider theme={theme}>
                {Component.Layout ? (
                    <Component.Layout>
                        <Component {...pageProps} />
                    </Component.Layout>
                ) : (
                    <Component {...pageProps} />
                )}
            </ChakraProvider>
        </>
    )
        ;
};

export default MyApp;
