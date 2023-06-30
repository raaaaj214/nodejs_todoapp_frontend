import {React, useContext} from 'react'
import "../styles/Navbar.css"
import { Link } from 'react-router-dom'
import { context } from '../index';
import axios from 'axios';

function Navbar() {
  const {isAuthenticated , setIsAuthenticated, loading , setLoading} = useContext(context);

    const clickHandler = async(event) => {
      setLoading(true);
      const response = await axios.get("https://nodejs-todoapp-9lze.onrender.com/users/logout" , {
        withCredentials : true,
      })

      const {success} = response.data
      if(success === true)
      {
        setIsAuthenticated(false);
      }
        setLoading(false);
    }

  return (
    <div className='navbar'>
        <div className="navbar-left">
            <div className="app-name">TODO APP</div>
        </div>
        <div className="navbar-right">
            <div className="home"  ><Link to="/">HOME</Link></div>
            <div className="profile"><Link to="/profile">PROFILE</Link></div>
            {
              isAuthenticated ? <button className='logout-btn' onClick={clickHandler} disabled={loading}>Log Out</button> : <div className="login"><Link to="/login">LOGIN</Link></div>
            }
        </div>
    </div>
  )
}

export default Navbar
