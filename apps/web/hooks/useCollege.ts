import { useState } from 'react';
import axios from 'axios';
import { Error } from './useFetch';

interface Info {
  label: string;
  value: string;
}

interface ReturnData {
  sendData: (District: string) => void;
  properties: {
    data: Info[] | null;
    isLoading: boolean;
    error: Error | null;
  };
}

export const useCollege = (): ReturnData => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<Error | null>(null);
  const [dataInfo, setData] = useState<Info[] | null>(null);
  const sendData = async (district: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `{https://us-central1-educational-institutions.cloudfunctions.net/getCollegeByDistrict?district=${district}'`
      );
      if (!data.ok) throw new Error(data.error);
      setData(data.map((el: { name: string }) => ({ value: el.name, label: el.name })));
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
