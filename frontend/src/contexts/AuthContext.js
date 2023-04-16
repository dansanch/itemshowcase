import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, getUser, logoutUser } from '../services/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const userData = await loginUser(email, password);
    setUser(userData);
    navigate('/path');
  };

  const register = async (email, password, username) => {
    const userData = await registerUser(email, password, username);
    setUser(userData);
    navigate('/path');
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    navigate('/path');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
