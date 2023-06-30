import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, Navigate } from "react-router-dom"
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import Register from './components/Register';
import { useContext, useEffect} from 'react';
import axios from 'axios';
import { context } from '.';
import Profile from './components/Profile';
import Home from './components/Home';

function App() {

  const {setIsAuthenticated, setUser, } = useContext(context);
  useEffect(() => {
  axios.get("https://nodejs-todoapp-9lze.onrender.com/users/me",{
      withCredentials : true
    }).then(res => {setUser(res.data.user)
      if(res.data.success === false)
        setIsAuthenticated(false)
        else
        setIsAuthenticated(true)
    }).catch( err => {setUser({})
    setIsAuthenticated(false)
  })
    
    },[])
   
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<Profile/>}></Route>
    </Routes>
    </>
  );
}

export default App;
