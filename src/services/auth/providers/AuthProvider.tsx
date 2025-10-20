import type { HydratedAuth } from '@/services/auth/types/Auth';
import type { ReactNode } from 'react';
import { createContext } from 'react';

type Props = {
  auth: HydratedAuth;
  children: ReactNode;
};

type AuthContextValue = HydratedAuth;

export const AuthContext = createContext<AuthContextValue>({
  isLogin: false,
});

export function AuthProvider({ auth, children }: Props) {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
