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

  const login = async (input, setTok) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}sessions`, input);
      console.log(response.data.token)
      setToken(response.data.token);
      setTok(response.data.token)
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

      console.log(axios.defaults)
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}logout`)
      console.log(response)
      if (response) {
        setToken(null)
        localStorage.removeItem('token');
        navigate('/login')
      }
      console.log(response)
    }
    catch(error) {
      console.error('Logout failed:', error);
    }
    
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}