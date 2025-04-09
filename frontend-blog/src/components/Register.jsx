import React, { useState } from 'react';
import axios from 'axios'

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
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}registrations`, input)
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
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Register