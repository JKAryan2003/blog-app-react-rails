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
import Protected from './components/Protected';
import Posts from './components/Posts';
import NewPost from './components/NewPost';

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
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LogIn setTok={setTok}/>} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/posts/new' element={<NewPost />} />
            
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
