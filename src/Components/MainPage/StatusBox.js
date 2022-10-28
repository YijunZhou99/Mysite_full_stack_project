import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import avatars from "../../Pics/avatars";
import FollowComponent from "./FollowComponent";
import followActions from "../../Redux/actions/followActions";
import "bootstrap/dist/css/bootstrap.min.css";
import { msgActions } from "../../Redux/actions/msgActions";


export function StatusBox() {
  const userObj = JSON.parse(localStorage.getItem("user"));
  const [userid, setUserid] = useState(userObj.id);
  const [name, setName] = useState(userObj.name);
  const [username, setUsername] = useState(userObj.username);
  const [username_follow, setUsername_follow] = useState("");
  
  const [mystatus, setMystatus] = useState(localStorage.getItem("Headline_"+userObj.id));
  const [inputstatus, setInputstatus] = useState("");
  const { message } = useSelector((state) => state.msgReducer);
  const [msgType, setMsgType] = useState("alert alert-success");
  const [msgIcon, setMsgIcon] = useState("check circle icon");
  const userCount = useRef(10);
  const formRef = useRef(null);

  const dispatch = useDispatch();

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    let new_status = inputstatus;
    new_status? setMystatus(new_status): setMystatus(mystatus);
    localStorage.setItem("Headline_"+userObj.id, new_status);
    setInputstatus("");
    formRef.current.reset();
  };

  const handleNewFollowing = (e) => {
    e.preventDefault();
  
    dispatch(followActions.addFollowing(username_follow))
    .then(() => {
      setMsgType("alert alert-success");
      setMsgIcon("check circle icon");
      setUsername_follow("");
    })
    .catch(() => {
      setMsgType("alert alert-danger");
      setMsgIcon("exclamation triangle icon");
      setUsername_follow("");
    });

    formRef.current.reset();
  };

  return (
    <div>
      <div className="card mb-3">
        <div className="card-body">
          <img className="rounded-circle" src={avatars[userid]} 
            width="200" height="200">
          </img> 
          <h5 className="card-title">{name} ( username: {username} )</h5>
          <p className="card-text">{mystatus}</p>
          <div className="d-flex justify-content-between">
            <input className="form-control" type="text" 
              placeholder="Update your status here!"
              id = "update_status" value={inputstatus}
              onChange={(e) => setInputstatus(e.target.value)}
              />
            <button className="btn btn-primary me-2" onClick={handleUpdateStatus}>
              Submit
            </button>
          </div>
        </div>
      </div>

      <div>
        <form className="d-flex justify-content-between" onSubmit={handleNewFollowing} ref={formRef}>
          <input className="form-control" type="text" 
          placeholder="Enter a username to follow!"
          onChange={(e) => setUsername_follow(e.target.value)}
          onFocus={() => dispatch(msgActions.clearMessage())}
          required/>
          <button className="btn btn-primary me-2">
            Add
          </button>
        </form> 
        {message?
        <div className={msgType} role="alert">
          <i className={msgIcon}></i>
          {message}
        </div>
      :null} 
      </div>

      <div>
      <FollowComponent />
      </div>

    </div>
  );

};