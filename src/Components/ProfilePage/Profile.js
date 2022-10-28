import { authActions }  from "../../Redux/actions/authActions";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useRef } from "react";
import avatars from "../../Pics/avatars";

import "./Profile.css";


const Profile = () => {


  const userObj = JSON.parse(localStorage.getItem("user"));
  const [userid, setUserid] = useState(userObj.id);
  const [username, setUsername] = useState(userObj.username);
  const [password, setPassword] = useState(userObj.password);
  const [email, setEmail] = useState(userObj.email);
  const [phone, setPhone] = useState(userObj.phone);
  const [zipcode, setZipcode] = useState(userObj.address.zipcode);

  const [message, setMessage] = useState("");
  const formRef = useRef(null);
  const imgRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const handleGotoMain = () => {
    navigate("/Main");
  };

  const handleUploadImg =() => {
    imgRef.current.click();
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const p_username = document.getElementById("p_username").value;
    const p_password = document.getElementById("p_password").value;
    const p_email = document.getElementById("p_email").value;
    const p_phone = document.getElementById("p_phone").value;
    const p_zipcode = document.getElementById("p_zipcode").value;

    p_username? setUsername(p_username): setUsername(username);
    p_password? setPassword(p_password): setPassword(password);
    p_email? setEmail(p_email): setEmail(email);
    p_phone? setPhone(p_phone): setPhone(phone);
    p_zipcode? setZipcode(p_zipcode): setZipcode(zipcode);

    setMessage((p_username?"Username ":"") 
        + (p_password?"Password ":"" )
        + (p_email?"Email ":"") 
        + (p_phone?"Phone Number ":"" )
        + (p_zipcode?"Zipcode ":"")
        );

    formRef.current.reset();
  };

  return (
    <div className="profile">
      <div className="ui fixed pointing menu">
        <div className="ui item">
          <h2>My Site</h2>
        </div>
        <div className="right menu">
          <a className="ui item link" onClick={handleGotoMain}>Main Page</a>
          <a className="ui item link" onClick={handleLogout}>Log Out</a>
        </div>
      </div>

    <div className="container rounded bg-white mt-5 mb-5">
    <div className="row">

        <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img className="rounded-circle mt-5 mb-3" width="250px" 
                src={avatars[userid]}/>
              <input ref={imgRef} type="file" id="avatar" name="avatar" style={{display:"none"}}/>
              <button className="btn btn-primary" onClick={handleUploadImg}>Change Image</button>
            </div>
        </div>

        <div className="col-md-5 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-right">My Profile</h2>
                </div>
                <div className='card'>
                  <div className='card-body'>
                    <div className="p-3">
                      <h4>Username</h4> 
                      <span className="card bg-light border border-white p-2">
                        {username}
                      </span>  
                    </div>
                    <div className="p-3">
                      <h4>Email</h4>
                      <span className="card bg-light border border-white p-2">
                        {email}
                      </span>
                    </div>
                    <div className="p-3">
                      <h4>Phone</h4>
                      <span className="card bg-light border border-white p-2">
                        {phone}
                      </span>
                      </div>
                    <div className="p-3">
                      <h4>Zipcode</h4>
                      <span className="card bg-light border border-white p-2">
                        {zipcode}
                      </span>
                    </div>

                  </div>
                  
                </div>
            </div>
        </div>
        
        <div className="col-md-4">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-right">Update Profile</h2>
                </div>

                {message? 
                <div className="alert alert-success mx-auto" role="alert">
                  {message} updated!
                </div>
                :null}

                <form ref={formRef} onSubmit={handleSubmit} className="updateform">
                <div className="row mb-3">
                    <div className="col-md-12 mb-3">
                      <label className="labels">Username</label>
                      <input type="text" className="form-control" id="p_username"
                      pattern="^[a-zA-Z]+\w*$" 
                      onInvalid={e => e.target.setCustomValidity(
                        'Username should start with letters and should not contain special characters.'
                        )}
                      onInput={e => e.target.setCustomValidity('')}
                      onFocus={(e)=>setMessage("")}
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="labels">Email</label>
                      <input type="email" className="form-control" id="p_email"/>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="labels">Phone Number</label>
                      <input type="text" className="form-control" id="p_phone"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      onInvalid={e => e.target.setCustomValidity('Please enter valid phone number in 123-123-1234 format.')}
                      onInput={e => e.target.setCustomValidity('')}
                      onFocus={(e)=>setMessage("")}
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="labels">Zipcode</label>
                      <input type="text" className="form-control" id="p_zipcode"
                      pattern="[0-9]{5}" 
                      onInvalid={e => e.target.setCustomValidity('Please enter valid zipcode.')}
                      onInput={e => e.target.setCustomValidity('')}
                      onFocus={(e)=>setMessage("")}
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="labels">Password</label>
                      <input type="password" className="form-control" id="p_password"
                      onFocus={(e)=>setMessage("")}/>
                    </div>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary" type="submit">
                    Save Profile
                  </button>
                </div>
                </form>
            </div>
        </div>
    </div>
</div>
    </div>

  );

};

export default Profile;