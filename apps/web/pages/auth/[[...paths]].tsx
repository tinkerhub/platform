import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import SuperTokens from 'supertokens-auth-react';
import { redirectToAuth } from 'supertokens-auth-react/recipe/passwordless';

const SuperTokensComponentNoSSR = dynamic(
  // eslint-disable-next-line no-promise-executor-return
  new Promise((res) => res(SuperTokens.getRoutingComponent)) as any,
  { ssr: false }
);

const Auth = () => {
  // redirect to "/auth" page if "/auth/random" route occur
  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      redirectToAuth();
    }
  }, []);

  return <SuperTokensComponentNoSSR />;
};

export default Auth;
