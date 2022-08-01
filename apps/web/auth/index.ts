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
      },
    }),
    Session.init(),
  ],
});
