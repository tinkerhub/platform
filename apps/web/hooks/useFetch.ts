import useSWR from 'swr';
import { apiHandler } from '../api';

interface Info {
  ok: boolean;
  data: unknown;
}
interface Error {
  ok: boolean;
  error: unknown;
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
