import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Register from './components/Register';
import LogIn from './components/LogIn';
import Home from './components/Home';
import Users from './components/Users';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<LogIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
