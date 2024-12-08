// app/ClientProviders.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { UserProvider } from '../context/UserContext';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';

interface ClientProvidersProps {
  children: ReactNode;
}

const ClientProviders = ({ children }: ClientProvidersProps) => {
  return (
    <SessionProvider>
      <UserProvider>
        <Toaster />
        {children}
      </UserProvider>
    </SessionProvider>
  );
};

export default ClientProviders;
