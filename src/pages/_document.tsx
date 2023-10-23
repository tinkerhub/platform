import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import { theme } from '@/theme';

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link rel='manifest' href='/manifest.json' />
                    <link rel='apple-touch-icon' href='/icon-192x192.png' />
                </Head>
                <body>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}
