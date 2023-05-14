import { useQuery } from '@tanstack/react-query';
import { platformAPI } from '../../config';

export const getUserData = async () => {
  const { data } = await platformAPI.get('/users/profile');
  return data;
};

export const useUserData = () =>
  useQuery({
    queryKey: ['user-data'],
    queryFn: getUserData,
  });
