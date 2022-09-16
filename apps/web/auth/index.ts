import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';

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
      signInUpFeature: {
        defaultCountry: 'IN',
        userInputCodeFormStyle: {
          button: {
            backgroundColor: 'rgba(65, 83, 240, 1)',
            border: '0px',
            width: '100%',
            margin: '0 auto',
          },
          superTokensBranding: {
            display: 'none',
          },
          headerTitle: {
            fontFamily: 'sans-serif',
          },
          container: {
            height: '550px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          inputWrapper: {
            ':focus-within': {
              // border: '1px solidrgba(65, 83, 240, 1)',
              // boxShadow: '0 0 0 0.1rem rgba(65, 83, 240, 1)',
            },
          },
        },
        emailOrPhoneFormStyle: {
          button: {
            backgroundColor: 'rgba(65, 83, 240, 1)',
            border: '0px',
            width: '100%',
            margin: '0 auto',
          },
          superTokensBranding: {
            display: 'none',
          },
          headerTitle: {
            fontFamily: 'sans-serif',
          },
          container: {
            height: '550px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
      },
      getRedirectionURL: async (context) => {
        if (context.action === 'SUCCESS') {
          if (context.isNewUser) {
            // user signed up
            return '/wizard';
          }
          // user signed in
          return '/profile';
        }
        return undefined;
      },
    }),
    Session.init(),
  ],
});
