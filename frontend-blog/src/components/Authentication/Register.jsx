import React, { useState } from 'react';
import axios from 'axios'
import './Login.css'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const input = {
        user: {
          username: name,
          email: email,
          password: password,
        }
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/registrations`, input)
      console.log(response.data)
    }
    catch(error) {
      if (error.response && error.response.data && error.response.data.errors) {
        alert(error.response.data.errors)
      }
      else {
        alert("An error occured")
      }
    } 
  }

  return (
    <div className='d-flex flex-column align-items-center vw-100 vh-100'>
      <h2 className='p-5'>Sign Up</h2>
      <div className='m-5 shadow formContainer  bg-body-tertiary rounded'>
        <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>

          <div className='p-4'>
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='p-4'>
            <input 
              type="email"   
              class="form-control" 
              placeholder="Email" 
              aria-label="Email" aria-describedby="basic-addon1"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className='p-4'>
            <input 
              type="password"   
              class="form-control" 
              placeholder="Password" 
              aria-label="Password" aria-describedby="basic-addon1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='p-4 text-center'>
            <button type="submit" className='btn btn-info'>Sign Up</button>
          </div>

        </form> 
      </div>
    </div>
  )
}

export default Register