import React, { useState } from "react";

import "./Login.scss";
import { ReactSVG } from "react-svg";
import { postRequest } from "../../ApiFunctions/Api";
import { routes } from "../../ApiFunctions/Api/routes";
import { setToken, setUser } from "../../Redux/Reducers/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async(e) =>{
    e.preventDefault();
    
      const onSuccess = (res) => {
        console.log('res____________',res)
        dispatch(setUser(res.user))
        dispatch(setToken(res.token))
        // setAnyState(res.)
      }
      const onError = (err) => {
        console.log('err___', err)
        toast.error('Incorrect Credentials!', {
        position: toast.POSITION.TOP_RIGHT
      });        // handle error
      }
  
      const body = {
        email: email,
        password: password,
        role: 'admin'
      };
      // dispatch(setLoader(true))
      await postRequest(body, routes.login, true, onSuccess, onError)
  
  }
  
  return (
    <div className="auth-container">
                  <ToastContainer />

      <div className="container">
        <div>
          <img src="./login-logo.svg" />
        </div>
        <div className="auth-main-container">
          <h1>Admin Login</h1>
          <form  onSubmit={(e)=>handleLogin(e)}>

          <input required type="email" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
          <input required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
          </form>
        </div>
      </div>
      <ReactSVG className="login-logo-cut" src="./login-logo-cut.svg" />
    </div>
  );
};

export default Login;
