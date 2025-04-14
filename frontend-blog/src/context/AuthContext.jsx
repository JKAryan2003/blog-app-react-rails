  import React, { createContext, useState, useEffect } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';

  export const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(localStorage.getItem('userId'))
    const [userName, setUserName] = useState(localStorage.getItem('userName'))

    useEffect(() => {
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
      }
    }, [token, userId, userName]);

    const login = async (input, setTok) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/sessions`, input);
        const authToken = response.data.token
        const currentUserId = response.data.user.id
        const currentUserName = response.data.user.username

        console.log(response)
        console.log(authToken)
        setToken(authToken);
        setUserId(currentUserId)
        setUserName(currentUserName)
        setTok(authToken)
        navigate('/posts')
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    console.log(userId)
    const logout = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/logout`)
        console.log(response)
        if (response) {
          setToken(null)
          setUserId(null)
          setUserName(null)
          navigate('/login')
        }
        console.log(response)
      }
      catch(error) {
        console.error('Logout failed:', error);
      }
      
    };

    return (
      <AuthContext.Provider value={{ token, userId, userName, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }