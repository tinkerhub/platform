import { createContext, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { Child, Form } from '../../types';
import { apiHandler } from '../../api';

interface Pro {
  user: Form | null;
  isUserLoading: boolean;
  setUserLoading: React.Dispatch<boolean>;
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
        localStorage.removeItem('isWizardComplted');
        router.push('/wizard');
      }
      if (data.Success && data.data) {
        // setting the info about the wizard in localstorage so that we can access it in supertokens redirection
        setUser(data.data);
        localStorage.setItem('isWizardComplted', 'YES');
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
    if ((!isUserLoading && !user) || (!user && path === 'profile')) {
      router.push('/wizard');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, path]);

  const value = useMemo(
    () => ({
      user,
      isUserLoading,
      getData,
      setUserLoading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [doesSessionExist, isUserLoading, getData]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};
