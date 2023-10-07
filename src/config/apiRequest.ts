import Axios from 'axios';
import Session from 'supertokens-auth-react/recipe/session';
import { ENV } from './env';

export const platformAPI = Axios.create({
  baseURL: ENV.apiDomain,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
Session.addAxiosInterceptors(platformAPI);
