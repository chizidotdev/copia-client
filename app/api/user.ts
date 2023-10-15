import axios from 'axios';
import { BASE_URL } from '~/lib/constants';
import type { User } from '~/lib/types';

type LoginRequest = {
  email: string;
  password: string;
};

export const signup = async ({ email, password }: LoginRequest): Promise<string> => {
  const response = await axios.post(
    `${BASE_URL}/signup`,
    { email, password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const signIn = async (options: { email: string; password: string }) => {
  const { email, password } = options!;
  const response = await axios.post(
    `${BASE_URL}/login`,
    { email, password },
    { withCredentials: true }
  );
  return response;
};
export const signInWithGoogle = async () => {
  window.location.href = `${BASE_URL}/login/google`;
};

export const getUser = async (): Promise<User | undefined> => {
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log((error as Error).message);
    return;
  }
};

export const signOut = async (): Promise<any> => {
  const response = await axios.get(`${BASE_URL}/logout`, {
    withCredentials: true,
  });
  return response.data;
};
