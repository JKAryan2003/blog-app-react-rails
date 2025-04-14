import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const NavBar = () => {
  const { token, userId, userName, logout } = useContext(AuthContext)
  const handleClick = () => {
    logout()
  }

  return (  
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid d-flex justify-space-between ">
        <a className="navbar-brand" href="#">Blog on Rails</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {
            token ? 
            (
              <ul className="navbar-nav ms-auto px-3 mb-2 mb-lg-0">
                <span className='mt-1 px-3 fs-5'>Hey {userName} !</span>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <Link to={`/users/${userId}/my_post`} className='nav-link'>My Posts</Link>
                </li>
                <li className="nav-item">
                  <Link to="/posts" className='nav-link'>Posts</Link>
                </li>
                <button onClick={handleClick} className='btn btn-danger'>Log Out</button>
              </ul>
            )
            :
            (
              <>
                <ul className="navbar-nav ms-auto px-3 mb-2 mb-lg-0">
                  <span>Hey {userName} !</span>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                  </li>
                  <li className="nav-item">
                    <Link to={`/users/${userId}/my_post`}className='nav-link'>My Posts</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className='nav-link'>Register</Link>
                  </li>
                  <li className="nav-item">
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