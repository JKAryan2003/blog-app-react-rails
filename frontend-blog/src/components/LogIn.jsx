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
    // <div>
    //   <Box display="flex" flexDirection={"column"} maxWidth={400} alignItems={"center"} justifyContent={"center"} margin={"auto"} marginTop={5}>
    //       <Typography variant='h3'>Log In</Typography>
    //       <TextField type={"email"} value={email} placeholder='Email' margin='normal' onChange={handleEmail}></TextField>
    //       <TextField type={"password"} value={password} placeholder='Password' margin='normal' onChange={handlePassword}></TextField>
    //       <Button variant='contained' margin='normal' onClick={() => handleSubmit(email, password)}>Log In</Button>
    //     </Box>
    // </div>

    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Log In</button>
      </form>
    </div>

  )
}

export default LogIn