import useSWR from 'swr';
import { apiHandler } from '../api';

export interface Info<T = any> {
  ok: boolean;
  data: T | unknown;
}
export interface Errors {
  message: string;
}

interface ReturnVal {
  isLoading: boolean;
  data: Info;
  error: Error;
}

export const useFetch = (url: string): ReturnVal => {
  const getData = async (uri: string) => {
    // here apiHandler refers to axios.create function
    const { data } = await apiHandler.get(uri);
    return data;
  };
  const { data, error } = useSWR(url, getData);

  return { data, error, isLoading: !error && !data };
};
