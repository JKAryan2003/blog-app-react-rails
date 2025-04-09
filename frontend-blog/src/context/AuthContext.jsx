import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token'));
  const url = "http://127.0.0.1:3000/api/v1/sessions"

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (input) => {
    try {
      const response = await axios.post(url, input);
      console.log(response.data.token)
      setToken(response.data.token);
      console.log(token)
      localStorage.setItem('token', token);
      navigate('/users')
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login')
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}