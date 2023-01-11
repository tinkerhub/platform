import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import '@fontsource/archivo/700.css';
import '@fontsource/archivo/400.css';
import '@fontsource/archivo/500.css';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: `'Archivo', sans-serif`,
  },
  styles: {
    global: {
      'input[disabled]': {
        opacity: '1 !important',
      },
      'div[data-disabled=true]': {
        opacity: '.7 !important',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          // bg: '#1328EC',
          bg: 'red',
        },
      },
    },
  },
});
