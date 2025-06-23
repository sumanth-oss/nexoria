/* import { User } from 'firebase/auth';

import { createContext } from 'react';
interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
 */

import { createContext } from 'react';

interface AuthContextType {
  user: any | null; // or use Clerk's User type if needed
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
