import { useState } from 'react';
import { Form } from '../types';
import { apiHandler } from '../api';
import { Error, Info } from './useFetch';

interface ReturnData {
  sendData: (val: Form) => void;
  properties: {
    data: Info | null;
    isLoading: boolean;
    error: Error | null;
  };
}

export const useData = (): ReturnData => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<Error | null>(null);
  const [dataInfo, setData] = useState<Info | null>(null);
  const sendData = async (dataField: Form) => {
    try {
      setIsLoading(true);
      const { data } = await apiHandler.post('/user', dataField);
      if (!data.ok) throw new Error(data.message);
      setData(data);
    } catch (e) {
      const { message } = e as Error;
      setError({
        ok: false,
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const properties = {
    data: dataInfo,
    isLoading,
    error: isError,
  };

  return {
    sendData,
    properties,
  };
};
