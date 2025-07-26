import useSWR from 'swr';
import { User } from '@/types/user';

export function useUser(id: string) {
  const { data, error, isLoading, mutate } = useSWR<User>(
    id ? `/api/users/${id}` : null
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR<User[]>('/api/users');

  return {
    users: data,
    isLoading,
    isError: error,
    mutate,
  };
} 