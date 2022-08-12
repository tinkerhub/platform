import { useState } from 'react';
import { Form } from '../types';
import { apiHandler } from '../api';

export const useData = (dataField: Form) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<any>(null);
  const [dataInfo, setData] = useState<any>(null);
  const sendData = async () => {
    setIsLoading(true);
    const { data } = await apiHandler.post('/user', dataField);
    if (!data.ok) {
      setError(data);
    } else {
      setData(data);
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
