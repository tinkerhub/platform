import { useState } from 'react';
import { apiHandler } from '../api';
import { Error, Info } from './useFetch';

interface ReturnData<T> {
  sendData: (val: T) => void;
  properties: {
    data: Info | null;
    isLoading: boolean;
    error: Error | null;
  };
}

export const useData = <T>(uri: string): ReturnData<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<Error | null>(null);
  const [dataInfo, setData] = useState<Info | null>(null);
  const sendData = async (dataField: T) => {
    try {
      setIsLoading(true);
      const { data } = await apiHandler.post(uri, dataField);
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
