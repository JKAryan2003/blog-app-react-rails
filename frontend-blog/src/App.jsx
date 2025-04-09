import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Register from './components/Register';
import LogIn from './components/LogIn';
import Home from './components/Home';
import Users from './components/Users';
import { AuthProvider } from './context/AuthContext';
import axios from 'axios';
import { useState } from 'react';

const setHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  else {
    delete axios.defaults.headers.common['Authorization']
  }
}
function App() {
  const [token, setTok] = useState(localStorage.getItem('token'))
  setHeader(token)
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LogIn setTok={setTok}/>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
