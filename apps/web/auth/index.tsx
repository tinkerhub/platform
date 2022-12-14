/* eslint-disable react/jsx-props-no-spreading */
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';
import { userInputCodeFormStyle, emailOrPhoneFormStyle } from './OverrideStyle';
import { ENV } from '../config';

export const authConfig = () => ({
  appInfo: {
    appName: ENV.appName || 'platform',
    apiDomain: ENV.apiDomain,
    websiteDomain: ENV.domain || 'http://localhost:3000',
    apiBasePath: ENV.apiPath || '/auth',
    websiteBasePath: ENV.webPath || '/auth',
  },
  recipeList: [
    Passwordless.init({
      useShadowDom: false,
      contactMethod: 'PHONE',
      palette: {
        textLabel: '#adb5bd',
        //   textTitle: localStorage.getItem('chakra-ui-color-mode') === 'light' ? 'black' : 'white',
      },
      override: {
        components: {
          // eslint-disable-next-line react/prop-types, arrow-body-style
          PasswordlessSignInUpHeader_Override: () => (
            <Flex flexDirection="column">
              <Heading
                fontSize="40px"
                fontWeight="700"
                marginBottom="10px"
                mb="25px"
                textAlign="left"
              >
                Welcome to TinkerHub{' '}
                <Box as="span" alignItems="flex-end">
                  👋
                </Box>
              </Heading>

              <Text mb="20px" textAlign="left" fontWeight={400} maxHeight="300px">
                We are thrilled to know that you want to join the TinkerHub mission. Let get
                started.
              </Text>
            </Flex>
          ),
        },
      },
      signInUpFeature: {
        defaultCountry: 'IN',
        userInputCodeFormStyle,
        emailOrPhoneFormStyle,
      },
      // getRedirectionURL: async (context) => {
      //   // called on a successful sign in / up. Where should the user go next?
      //   if (context.action === 'SUCCESS') {
      //     const isWizardCompleted = localStorage.getItem('isWizardCompleted'); // returns null or "YES"
      //     if (isWizardCompleted) {
      //       // user signed up and have wizardform completed
      //       return '/profile'; // redirect to profile page
      //     }
      //   }
      //   return undefined;
      // },
    }),
    Session.init(),
  ],
});
