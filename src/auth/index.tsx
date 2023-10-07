/* eslint-disable react/jsx-props-no-spreading */
import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';
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
      },
    }),
    Session.init(),
  ],
});
