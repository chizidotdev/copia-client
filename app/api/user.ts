import { BASE_URL } from '@/lib/constants';
import client from './client';

type RegisterRequest = {
  email: string;
  password: string;
};
export const signup = async (data: RegisterRequest) => {
  return await client.post(`/register`, data, {
    withCredentials: true,
  });
};

type LoginRequest = {
  email: string;
  password: string;
};
export const signIn = async ({ email, password }: LoginRequest) => {
  const response = await client.post(
    `${BASE_URL}/login`,
    { email, password },
    { withCredentials: true }
  );
  return response;
};

export const signInWithGoogle = async () => {
  const REDIRECT_URI = `${window.location.origin}/dashboard`;
  const GOOGLE_AUTH_URL = `${BASE_URL}/login/google`;
  const browserWindow = window.open(
    GOOGLE_AUTH_URL,
    'Google Sign In',
    'width=800,height=600'
  );

  async function verify() {
    try {
      await client.get(`${BASE_URL}/user`, { withCredentials: true });
      window.location.href = REDIRECT_URI;
    } catch (error) {
      return;
    }
  }

  let interval: NodeJS.Timeout | undefined;
  clearInterval(interval);

  interval = setInterval(() => {
    if (browserWindow?.closed) {
      verify();
      clearInterval(interval);
    }
  }, 1000);
};

export const getUser = async (): Promise<User | undefined> => {
  try {
    const response = await client.get(`/user`, {
      withCredentials: true,
    });
    return response as User;
  } catch (error) {
    console.log((error as Error).message);
    return;
  }
};

export const signOut = async (): Promise<any> => {
  const response = await client.get(`/logout`, {
    withCredentials: true,
  });
  return response;
};
