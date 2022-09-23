import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { Child, Form } from '../../types';
import { apiHandler } from '../../api';

interface Pro {
  user: Form | null;
  isUserLoading: boolean;
  getData: () => Promise<void>;
}

export const AuthCtx = createContext({} as Pro);

export const AuthContext = ({ children }: Child) => {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  const [user, setUser] = useState<Form | null>(null);
  const [isUserLoading, setUserLoading] = useState(true);
  const session = useSessionContext();
  const toast = useToast();
  const { doesSessionExist } = session as any;

  const getData = async () => {
    try {
      setUserLoading(true);
      const { data } = await apiHandler.get('/users/profile');
      if (!data.Success) {
        throw new Error();
      }
      if (data.Success && data.data === null) {
        router.push('/wizard');
      }
      if (data.Success && data.data) {
        setUser(data.data);
      }
    } catch {
      router.push('/');
      toast({
        title: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    if (doesSessionExist) {
      getData();
    } else {
      setUserLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doesSessionExist]);

  useEffect(() => {
    if (user && path === 'wizard') {
      router.replace('/profile');
    }

    if (!isUserLoading && !user) {
      router.push('/wizard');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, path]);

  const value = useMemo(
    () => ({
      user,
      isUserLoading,
      getData,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [doesSessionExist, isUserLoading, getData]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};
