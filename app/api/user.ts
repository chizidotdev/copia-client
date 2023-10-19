import { BASE_URL } from '@/lib/constants';
import axios from 'axios';

type LoginRequest = {
  email: string;
  password: string;
};

export const signup = async ({
  email,
  password,
}: LoginRequest): Promise<string> => {
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
  const REDIRECT_URI = `${window.location.origin}/dashboard`;
  const GOOGLE_AUTH_URL = `${BASE_URL}/login/google`;
  const browserWindow = window.open(
    GOOGLE_AUTH_URL,
    'Google Sign In',
    'width=800,height=600'
  );

  async function verify() {
    try {
      await axios.get(`${BASE_URL}/user`, { withCredentials: true });
      window.location.href = REDIRECT_URI;
    } catch (error) {
      return;
    }
  }

  let interval = setInterval(() => {
    if (browserWindow?.closed) {
      verify();
      clearInterval(interval);
    }
  }, 1000);
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
