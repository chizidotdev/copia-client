import { BASE_URL } from '@/lib/constants';
import axios from 'axios';

type RegisterRequest = {
  email: string;
  password: string;
};
export const signup = async (data: RegisterRequest) => {
  const response = await axios.post(`${BASE_URL}/register`, data);
  return response.data;
};

type LoginRequest = {
  email: string;
  password: string;
};
export const signIn = async ({ email, password }: LoginRequest) => {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  return response.data;
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
      await axios.get(`${BASE_URL}/user`);
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

export const getUser = async (): Promise<APIResponse<User> | undefined> => {
  const isAuthPage = window.location.href.includes('/u/register');
  // if user is on registration page, don't fetch user
  if (isAuthPage) return;

  const response = await axios.get(`${BASE_URL}/user`);
  return response.data;
};

export const signOut = async (): Promise<APIResponse<string>> => {
  const response = await axios.post(`${BASE_URL}/logout`);
  return response.data;
};

export const resetPassword = async (payload: { email: string }) => {
  const response = await axios.post(`${BASE_URL}/reset-password`, payload);
  return response.data;
};

type ChangePasswordRequest = { password: string; code: string };
export const changePassword = async (payload: ChangePasswordRequest) => {
  const response = await axios.post(`${BASE_URL}/change-password`, payload);
  return response.data;
};

export const verifyEmail = async (payload: { code: string }) => {
  const response = await axios.post(`${BASE_URL}/verify-email`, payload);
  return response.data;
};

export const sendVerificationEmail = async (payload: { email: string }) => {
  const response = await axios.post(
    `${BASE_URL}/send-verification-email`,
    payload
  );
  return response.data;
};
