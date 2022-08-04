import React, { createContext, useMemo, useState } from 'react';
import type { Form } from '../../pages/profile';
import type { Child } from '../../types';

interface WizardContextProp {
  user: Form | null;
  addData: (data: Form) => void;
  sendData?: () => Promise<void>;
}

export const WizardContext = createContext<WizardContextProp>({} as WizardContextProp);

export const WizardContextProvider = ({ children }: Child) => {
  const [user, setUser] = useState<Form | null>(null);

  const addData = (data: Form): void => {
    setUser({ ...user, ...data });
  };

  const Value = useMemo(
    () => ({
      addData,
      user,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return <WizardContext.Provider value={Value}>{children}</WizardContext.Provider>;
};
