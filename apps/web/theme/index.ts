import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import '@fontsource/archivo/700.css';
import '@fontsource/archivo/400.css';
import '@fontsource/archivo/500.css';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: `'Archivo', sans-serif`,
  },
});
