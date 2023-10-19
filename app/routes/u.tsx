import { AppLogo } from '@/components/app-logo';
import { Outlet } from '@remix-run/react';
import type { ChangeEventHandler } from 'react';
import { createContext, useContext, useState } from 'react';

type AuthLayoutContextType = {
  email: string;
  password: string;
  setEmail: ChangeEventHandler<HTMLInputElement>;
  setPassword: ChangeEventHandler<HTMLInputElement>;
};
const AuthLayoutContext = createContext({} as AuthLayoutContextType);
export const useAuthLayout = () => {
  const context = useContext(AuthLayoutContext);
  if (context === undefined) {
    throw new Error('useAuthLayout must be used within a AuthLayoutContext');
  }
  return context;
};

export default function AuthLayout() {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');

  const setEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateEmail(e.target.value);
  };

  const setPassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    updatePassword(e.target.value);
  };

  const value: AuthLayoutContextType = {
    email,
    password,
    setEmail,
    setPassword,
  };

  return (
    <div className='mx-5'>
      <div className='mx-auto my-10 w-fit'>
        <AppLogo />
      </div>

      <div className='mx-auto flex h-[70vh] max-w-sm flex-col justify-center px-5'>
        <AuthLayoutContext.Provider value={value}>
          <Outlet />
        </AuthLayoutContext.Provider>
      </div>
    </div>
  );
}
