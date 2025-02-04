import { useContext } from 'react';
import { AuthContext } from './authcontext';
import { AuthContextType } from '../../types/auth.type';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};