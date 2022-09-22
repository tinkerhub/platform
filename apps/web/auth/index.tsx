/* eslint-disable react/jsx-props-no-spreading */
import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';
import { Header, userInputCodeFormStyle, emailOrPhoneFormStyle } from './OverrideStyle';

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
              <h1 style={Header}>Enter Your Mobile Number</h1>
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
