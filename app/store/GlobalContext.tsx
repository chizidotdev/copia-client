import { getUser } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';

const GlobalContext = createContext({} as { user: User });
export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data } = useQuery({ queryKey: ['user'], queryFn: getUser });
  const user = data?.data;

  return (
    <GlobalContext.Provider value={{ user: user! }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobals = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobals must be used within a GlobalContextProvider');
  }
  return context;
};
