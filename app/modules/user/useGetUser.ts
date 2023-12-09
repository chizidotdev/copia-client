import { getUser } from '@/api/user';
import { useQuery } from '@tanstack/react-query';

export const useGetUser = () => {

  return useQuery({ queryKey: ['user'], queryFn: getUser });
};
