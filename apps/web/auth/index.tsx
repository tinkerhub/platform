/* eslint-disable react/jsx-props-no-spreading */
import { Heading } from '@chakra-ui/react';
import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';
import { userInputCodeFormStyle, emailOrPhoneFormStyle } from './OverrideStyle';

export const authConfig = () => ({
  appInfo: {
    appName: process.env.NEXT_PUBLIC_APPNAME,
    apiDomain: process.env.NEXT_PUBLIC_APIDOMAIN,
    websiteDomain: process.env.NEXT_PUBLIC_DOMAIN,
    apiBasePath: process.env.NEXT_PUBLIC_APIPATH,
    websiteBasePath: process.env.NEXT_PUBLIC_PATH,
  },
  recipeList: [
    Passwordless.init({
      useShadowDom: false,
      contactMethod: 'PHONE',
      override: {
        components: {
          // eslint-disable-next-line react/prop-types, arrow-body-style
          PasswordlessSignInUpHeader_Override: () => (
            <div>
              <Heading fontSize="40px" color="black" fontWeight="500" marginBottom="10px" mb="40px">
                Welcome to TinkerHub
              </Heading>
            </div>
          ),
        },
      },
      signInUpFeature: {
        defaultCountry: 'IN',
        userInputCodeFormStyle,
        emailOrPhoneFormStyle,
      },
      getRedirectionURL: async (context) => {
        if (context.action === 'SUCCESS') {
          // user signed in
          return '/profile';
        }
        return undefined;
      },
    }),
    Session.init(),
  ],
});
