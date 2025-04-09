import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

const LogIn = ({setTok}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const input = {
      user: {
        email: email,
        password: password,
      }
    }
    login(input,setTok)
  }

  return (
    <>
      <div className='d-flex flex-column align-items-center vw-100 vh-100'>
        <h2 className='p-5'>Log In</h2>
        <div className='w-50 h-50 m-5 shadow p-5 bg-body-tertiary rounded'>
          <form onSubmit={handleSubmit} className='d-flex flex-column '>

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
              <button type="submit" className='btn btn-info'>Log In</button>
            </div>

          </form> 
        </div>
      </div>
    </>
  )
}

export default LogIn