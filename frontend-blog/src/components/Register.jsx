import React, { useState } from 'react';
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const url = 'http://127.0.0.1:3000/api/v1/registrations'

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
      const response = await axios.post(url, input)
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