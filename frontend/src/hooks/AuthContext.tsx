import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface AuthContextData {
  signIn(data: SignInCredentials): Promise<void>;
  signOut(): void;
  user: Object;
  updateUser(user: IUser): void;
  refreshUser(id: string): void;
}
interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: object;
}
interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Inovativa:token');
    const user = localStorage.getItem('@Inovativa:user');
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/login', {
      email,
      password,
    });
    const { token, user } = response.data.data;

    localStorage.setItem('@Inovativa:token', token);
    localStorage.setItem('@Inovativa:user', JSON.stringify(user[0]));

    setData({ token, user });
  }, []);

  const refreshUser = useCallback(
    async (id: string) => {
      const response = await api.post(`/list/${id}`);
      const user = response.data.data;
      localStorage.setItem('@Inovativa:user', JSON.stringify(user));
    },
    [data.token],
  );

  const signOut = useCallback(async () => {
    localStorage.removeItem('@Inovativa:token');
    localStorage.removeItem('@Inovativa:user');
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: IUser) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}
