import React from "react";

import { authActions }  from "../../Redux/actions/authActions";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StatusBox } from "./StatusBox";
import { PostBox } from "./PostBox";

import "./main.css";


const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const handleGotoProfile = () => {
    navigate("/Profile");
  };


  return (
    <div>
      <div className="ui fixed pointing menu">
        <div className="ui item">
          <h2>My Site</h2>
        </div>
        <div className="right menu">
          <a className="ui item link" onClick={handleGotoProfile}>My Profile</a>
          <a className="ui item link" onClick={handleLogout} >Log Out</a>
        </div>
      </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <div className="row">

    <div className="status col-sm">
      <StatusBox />
    </div>

    <div className="post col-sm-8">
      <PostBox />
    </div>

    </div>
   
    </div>
  );

};

export default Main;