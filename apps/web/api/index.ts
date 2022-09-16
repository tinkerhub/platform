import Axios from 'axios';
import Session from 'supertokens-auth-react/recipe/session';

export const apiHandler = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIDOMAIN,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
Session.addAxiosInterceptors(apiHandler);
