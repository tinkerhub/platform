import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { Child, Form } from '../../types';
import { apiHandler } from '../../api';

interface Pro {
  user: Form | null;
  isUserLoading: boolean;
}

export const AuthCtx = createContext({} as Pro);

export const AuthContext = ({ children }: Child) => {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  const [user, setUser] = useState<Form | null>(null);
  const [isUserLoading, setUserLoading] = useState(true);
  const session = useSessionContext();
  useEffect(() => {
    const { doesSessionExist } = session as any;
    if (doesSessionExist) {
      (async () => {
        try {
          const { data } = await apiHandler.get('/users/profile');
          if (!data.Success) throw new Error();
          setUser(data.data);
        } catch (e: unknown) {
          console.log(e);
        } finally {
          setUserLoading(false);
        }
      })();
    }
  }, [session]);

  useEffect(() => {
    if (!user) {
      router.replace('/wizard');
    }
    if (user && path === 'wizard') {
      router.replace('/profile');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      isUserLoading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session, isUserLoading]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};
