import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Register from './components/Authentication/Register';
import LogIn from './components/Authentication/LogIn';
import Home from './components/Home';
import { AuthProvider } from './context/AuthContext';
import axios from 'axios';
import { useState } from 'react';
import Protected from './components/Protected';
import Posts from './components/Posts/Posts';
import NewPost from './components/Posts/NewPost';
import ShowPost from './components/Posts/ShowPost';
import MyPost from './components/Posts/MyPost';

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
            <Route path='/posts/:id' element={<ShowPost />}></Route>
            <Route path="/users/:user_id/my_post" element={<MyPost />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
