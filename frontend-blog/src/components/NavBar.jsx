import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { token, logout } = useContext(AuthContext)

  const handleClick = () => {
    logout()
  }
  
  return (
    <div>
      {token ? 
        (
          <div>
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
            <button onClick={handleClick}>Log Out</button>
          </div>  
        )
        :
        (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        ) 
      }   
    </div>
  )
}

export default NavBar