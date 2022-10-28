import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {Form} from "react-bootstrap";
import "./forms.css";
import { authActions }  from "../../Redux/actions/authActions";
import { msgActions } from "../../Redux/actions/msgActions";
import "bootstrap/dist/css/bootstrap.min.css";
import postActions from "../../Redux/actions/postActions";
import followActions from "../../Redux/actions/followActions";


export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [from_login, setFromLogin] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.authReducer);
  const { message } = useSelector((state) => state.msgReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msgType, setMsgType] = useState("alert alert-danger w-50 mx-auto");

  dispatch(followActions.getAllUsers());
  dispatch(postActions.getAllPosts());

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    
    dispatch(authActions.login(username, password))
      .then(() => {
        setMsgType("alert alert-success w-50 mx-auto");
        dispatch(msgActions.setMessage("Login successful: redirecting to main page"));
        dispatch(followActions.getFollowings(localStorage.getItem("user")));
        setTimeout(() => {
        navigate("/Main");
        dispatch(msgActions.clearMessage());
        }, 2000);
      })
      .catch(() => {
        setMsgType("alert alert-danger w-50 mx-auto");
        dispatch(msgActions.setMessage("Login failed: username or password is incorrect"));
        setUsername("");
        setPassword("");
      });
  };

  // const handleLogout = () => {
  //   dispatch(authActions.logout());
  //   dispatch(msgActions.clearMessage());
  //   navigate("/");
  // };

  // if(isLoggedIn) {
  //   return < Navigate to="/Main" />;
  // };

  return (
    <div className="form">
      {/* <button onClick={handleLogout}>logout</button> */}
      <h2>Login</h2>
      {message&&from_login?
        <div className={msgType} role="alert">
          {message}
        </div>
      :null}

      <Form onSubmit={handleLoginSubmit} >
        <div className="form-group row">
          <label htmlFor="username" className="col-sm-3 col-form-label mb-4">Account Name</label>
          <div className="col-sm-5">
            <input className="form-control" type="text" 
            id="username" name="username" 
            value = {username}
            onFocus={(e) => dispatch(msgActions.clearMessage())}
            onChange = {(e) => setUsername(e.target.value)}
            required/>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="password" className="col-sm-3 col-form-label mb-4">Password</label>
          <div className="col-sm-5">
            <input className="form-control" type="password" 
            id="password" name="password" 
            value = {password}
            onFocus={(e) => dispatch(msgActions.clearMessage())}
            onChange = {(e) => setPassword(e.target.value)}
            required/>
          </div>
        </div>
       
        <button className = "btn btn-primary mb-2" type="submit"
        onClick={(e)=> setFromLogin(true)}>Log In</button>
      </Form>      
    </div>
  );

};

