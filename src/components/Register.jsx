import React, { useContext, useState } from "react";
import axios from "axios";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../index.js";
import { toast } from 'react-toastify';



function Register() {
  // Hooks
  const {loading ,setLoading} = useContext(context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submitHandler = async(event) => {

    event.preventDefault();
    setLoading(true);
    console.log(name, email, password);
      const response = await axios.post(
        "https://nodejs-todoapp-9lze.onrender.com/users/register",
        {
          name,
          email,
          password,
        },
        {
          headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  },
          withCredentials: true,
        }
      );
      if(response.data.success === true)
      {
        nav("/login")
      }
      setLoading(false);
      toast.success(response.data.message)
  };

  return (
    <div className="register">
      <div className="rg-box">
        <h1>Create Your Account</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="rg-form-btn">
            <button type="submit" disabled={loading}>Sign Up</button>
          </div>
          <div className="h3">OR</div>
          <div className="rg-form-btn2">
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
