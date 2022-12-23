/* eslint-disable react/jsx-props-no-spreading */
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
