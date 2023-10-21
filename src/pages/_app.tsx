/* eslint-disable react/jsx-props-no-spreading */
import {ChakraProvider} from '@chakra-ui/react';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {theme} from '@/theme';
import {Child} from '@/types';

type ComponentWithPageLayout = AppProps & {
    Component: AppProps['Component'] & {
        Layout?: (arg: Child) => JSX.Element;
    };
};

const MyApp = ({Component, pageProps}: ComponentWithPageLayout) => {
    const router = useRouter();
    const path = String(router.pathname.split('/')[1]);
    return (
        <>
            <Head>
                <title>{path} / tinkerhub</title>
            </Head><>
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
        </>
    )
        ;
};

export default MyApp;
