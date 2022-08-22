import { useState } from 'react';
import { Form } from '../types';
import { apiHandler } from '../api';

export const useData = (dataField: Form) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<any>(null);
  const [dataInfo, setData] = useState<any>(null);
  const sendData = async () => {
    setIsLoading(true);
    try {
      const { data } = await apiHandler.post('/user', dataField);
      if (!data.ok) throw new Error(data.message);
      setData(data);
    } catch (e) {
      setError(e);
    }
    setIsLoading(false);
  };
  sendData();

  return {
    data: dataInfo,
    isLoading,
    error: isError,
  };
};
