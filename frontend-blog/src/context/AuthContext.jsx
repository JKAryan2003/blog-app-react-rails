import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (input) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}sessions`, input);
      console.log(response.data.token)
      setToken(response.data.token);
      console.log(token)
      localStorage.setItem('token', token);
      navigate('/users')
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      const header_token = localStorage.getItem('token')
      console.log(header_token)
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}logout`, {}, {
        headers: {
          Authorization: `Bearer ${header_token}`
        }
      })
      
      if (response) {
        setToken(null)
        localStorage.removeItem('token');
        navigate('/login')
      }
      console.log(response)
    }
    catch(error) {
      console.error('Login failed:', error);
    }
    
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}