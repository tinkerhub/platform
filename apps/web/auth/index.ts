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
      contactMethod: 'PHONE',
      signInUpFeature: {
        defaultCountry: 'IN',
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
        },
      },
      getRedirectionURL: async (context) => {
        if (context.action === 'SUCCESS') {
          if (context.redirectToPath !== undefined) {
            // we are navigating back to where the user was before they authenticated
            return context.redirectToPath;
          }
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
