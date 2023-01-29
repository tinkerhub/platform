import { createContext, useState, useEffect, useMemo } from 'react';
import Router, { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { Child, Form } from '../../types';
import { platformAPI } from '../../config';

interface Prop {
  user: Form | null;
  isUserLoading: boolean;
  setUser: React.Dispatch<Form | null>;
}

export const AuthCtx = createContext({} as Prop);

export const AuthContext = ({ children }: Child) => {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  const [user, setUser] = useState<Form | null>(null);
  const [isUserLoading, setUserLoading] = useState(true);
  const session = useSessionContext();
  const toast = useToast();
  const { doesSessionExist } = session as any;

  // listening for route change events
  Router.events.on('routeChangeStart', () => {
    // when route change loading screen popup
    setUserLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setUserLoading(false);
  });

  const getData = async () => {
    try {
      setUserLoading(true);
      const { data } = await platformAPI.get('/users/profile');
      if (data && !data.success) {
        throw new Error();
      }

      if (data.success && data.data === null) {
        localStorage.removeItem('isWizardCompleted');
        router.push('/wizard');
      }
      if (data.success && data.data) {
        // setting the info about the wizard in localstorage so that we can access it in supertokens redirection
        setUser(data.data);
        localStorage.setItem('isWizardCompleted', 'YES');
        router.push('/profile');
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
    // preventing the wizard router after onboarding process
    if (user && path === 'wizard') {
      router.replace('/profile');
    }
    // prevent the profile route before onboarding process
    if (!user && path === 'profile') {
      router.replace('/wizard');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, path]);

  const value = useMemo(
    () => ({
      user,
      isUserLoading,
      setUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [doesSessionExist, isUserLoading, getData]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};
