import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const NavBar = () => {
  const { token, userId, logout } = useContext(AuthContext)
  const handleClick = () => {
    logout()
  }

  return (  
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid d-flex justify-space-between ">
        <a class="navbar-brand" href="#">Blog on Rails</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {
            token ? 
            (
              <ul class="navbar-nav ms-auto px-3 mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <Link to={`/users/${userId}/my_post`} className='nav-link'>My Posts</Link>
                </li>
                <li class="nav-item">
                  <Link to="/posts" className='nav-link'>Posts</Link>
                </li>
                <button onClick={handleClick} className='btn btn-danger'>Log Out</button>
              </ul>
            )
            :
            (
              <>
                <ul class="navbar-nav ms-auto px-3 mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                  </li>
                  <li class="nav-item">
                    <Link to={`/users/${userId}/my_post`}className='nav-link'>My Posts</Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/register" className='nav-link'>Register</Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/login" className='nav-link'>Login</Link>
                  </li>
                </ul>
              </>
            )
          }    
        </div>
      </div>
    </nav>
  )
}

export default NavBar