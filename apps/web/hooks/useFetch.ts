import useSWR from 'swr';
import { apiHandler } from '../api';

export interface Info<T = any> {
  ok: boolean;
  data: T;
}
export interface Errors {
  message: string;
}

interface ReturnVal<T = any> {
  isLoading: boolean;
  data: Info<T>;
  error: Error;
}

export const useFetch = <T>(url: string): ReturnVal<T> => {
  const getData = async (uri: string) => {
    // here apiHandler refers to axios.create function
    const { data } = await apiHandler.get(uri);
    return data;
  };
  const { data, error } = useSWR(url, getData);

  return { data, error, isLoading: !error && !data };
};
