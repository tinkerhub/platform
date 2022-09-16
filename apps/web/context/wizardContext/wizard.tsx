import React, { createContext, useMemo, useState } from 'react';
import { apiHandler } from '../../api';
import type { Form } from '../../pages/profile';
import type { Child } from '../../types';

interface WizardContextProp {
  user: Form | null;
  addData: (data: Form) => void;
  sendData: () => Promise<void>;
  isLoading: boolean;
}

export const WizardContext = createContext<WizardContextProp>({} as WizardContextProp);

export const WizardContextProvider = ({ children }: Child) => {
  const [user, setUser] = useState<Form | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const addData = (data: Form): void => {
    setUser({ ...user, ...data });
  };

  const sendData = async () => {
    // just for dummey purpose will change later
    setLoading(true);
    const { data } = await apiHandler.post('/user/info', {
      data: user,
    });
    setLoading(false);
    return data;
  };

  const Value = useMemo(
    () => ({
      addData,
      user,
      sendData,
      isLoading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return <WizardContext.Provider value={Value}>{children}</WizardContext.Provider>;
};
