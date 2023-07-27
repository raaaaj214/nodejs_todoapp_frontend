import React, { useContext, useEffect, useState } from 'react'
import "../styles/LoginPage.css"
import { Link, Navigate, Route, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { context } from '../index.js';
import { toast } from 'react-toastify';




function LoginPage() {
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const {setIsAuthenticated,loading, setLoading, isAuthenticated} = useContext(context);


  useEffect(()=>{
    if(isAuthenticated === true)
    {
    navigate("/")
    }
  }, [isAuthenticated])
    
  
  const submitHandler = async (event) =>{
    try {
      event.preventDefault();
    setLoading(true);
    const reponse = await axios.post("https://nodejs-todoapp-9lze.onrender.com/users/login",{
      email,
      password
    },{ 
      withCredentials : true
    })

    const {success} = reponse.data;
    setIsAuthenticated(success)
    setLoading(false);
    if(reponse.data.success === true)
    {
      toast.success(reponse.data.messsage)
    }
    else
    {
      toast.error(reponse.data.messsage)
    }
    
    } catch (error) {
      toast.error(error)
    }
    
  }

  return (
    <div className='landingPage'>
        <div className="lp-box">
        <h1>Log In to Your Account</h1>
      <form onSubmit={submitHandler}>
        <input type="email" name="email" id="email" placeholder='Enter email address' value={email} onChange={(event) => {setEmail(event.target.value)}}/>
        <input type="password" name="password" id="password" placeholder='Enter Password' value={password} onChange={(event) => {setPassword(event.target.value)}}/>
        <div className="lp-form-btn">
        <button disabled={loading} type='submit'>Log In</button>
        </div>
          <div className="h3">OR</div>
        <div className="lp-form-btn2">
          <Link to="/register">Sign Up</Link>
        </div>
      </form>

      </div>
    </div>
  )
}

export default LoginPage
