import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/userApi.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Khôi phục session khi app khởi động.
  useEffect(() => {
    const savedUser = localStorage.getItem('current_user');

    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('current_user');
      }
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError('');

    try {
      const { account, user } = await authApi.login(username, password);

      const session = {
        ...user,
        role: account.role,
      };

      setCurrentUser(session);

      localStorage.setItem('current_user', JSON.stringify(session));
      localStorage.setItem('auth_token', `fake-token-${account.id}`);

      return true;
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.clear();
  };

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      error,
      login,
      logout,
    }),
    [currentUser, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth phải được dùng bên trong AuthProvider.');
  }

  return context;
}