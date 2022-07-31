import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';

export const authConfig = () => ({
  appInfo: {
    appName: 'platform',
    apiDomain: 'http://localhost:8000',
    websiteDomain: 'http://localhost:3000',
    apiBasePath: '/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [
    Passwordless.init({
      contactMethod: 'PHONE',
    }),
    Session.init(),
  ],
});
