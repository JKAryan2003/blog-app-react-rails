import React from 'react'

const LogIn = () => {
  return (

    <div>
      <Box display="flex" flexDirection={"column"} maxWidth={400} alignItems={"center"} justifyContent={"center"} margin={"auto"} marginTop={5}>
          <Typography variant='h3'>Log In</Typography>
          <TextField type={"email"} value={email} placeholder='Email' margin='normal' onChange={handleEmail}></TextField>
          <TextField type={"password"} value={password} placeholder='Password' margin='normal' onChange={handlePassword}></TextField>
          <Button variant='contained' margin='normal' onClick={() => handleSubmit(email, password)}>Log In</Button>
        </Box>
    </div>

  )
}

export default LogIn