import { useState, useRef } from "react";
import { Form } from "react-bootstrap";
import "./forms.css";
import { Navigate, useNavigate } from "react-router-dom";
import { authActions }  from "../../Redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import postActions from "../../Redux/actions/postActions";
import { msgActions } from "../../Redux/actions/msgActions";
import followActions from "../../Redux/actions/followActions";

export function RegisterForm() {

  const formRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [from_register, setFromRegister] = useState(false);
  const { message } = useSelector((state) => state.msgReducer);
  const [msgType, setMsgType] = useState("alert alert-danger w-50 mx-auto");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = {
    id: 0,
    username: username,
    password: password,
    email: email,
    phone: phone,
    address: {zipcode: zipcode},
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    dispatch(authActions.register(data)).then(() => {
      setMsgType("alert alert-success w-50 mx-auto");
      dispatch(msgActions.setMessage("Registration successful: redirecting to main page"));
      dispatch(followActions.getFollowings(localStorage.getItem("user")));
      setTimeout(() => {
      navigate("/Main");
      dispatch(msgActions.clearMessage());
      }, 2000);
    }).catch(() => {
      setMsgType("alert alert-danger w-50 mx-auto");
      setUsername("");
      setPassword("");
      setEmail("");
      setPhone("");
      setZipcode("");
      formRef.current.reset();
    });
  };

  return (
    
    <div className="form">
      <h2>Register</h2>
      
      {message&&from_register?
        <div className={msgType} role="alert">
          {message}
          </div>
      :null}

      <Form ref={formRef} onSubmit={handleRegisterSubmit}>
        <div className="form-group row">
          <label htmlFor="accountname" className="col-sm-3 col-form-label mb-4">Account Name*</label>
          <div className="col-sm-5">
            <input className="form-control" type="text" 
              id="accountname" name="accountname" 
              onFocus={(e) => dispatch(msgActions.clearMessage())}
              pattern="^[a-zA-Z]+\w*$" 
              onInvalid={e => e.target.setCustomValidity('Username should start with letters and should not contain special characters.')}
              onInput={e => e.target.setCustomValidity('')}
              onChange = {(e) => setUsername(e.target.value)}
              required/>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="displayname" className="col-sm-3 col-form-label mb-4">Display Name</label>
          <div className="col-sm-5">
            <input className="form-control" type="text" 
            id="displayname" name="displayname" 
            onFocus={(e) => dispatch(msgActions.clearMessage())}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="email" className="col-sm-3 col-form-label mb-4">Email*</label>
          <div className="col-sm-5">
            <input className="form-control" type="email" 
            id="email" name="email" 
            onInvalid={e => e.target.setCustomValidity('Please enter valid email address.')}
            onInput={e => e.target.setCustomValidity('')}
            onChange = {(e) => setEmail(e.target.value)}
            onFocus={(e) => dispatch(msgActions.clearMessage())}
            required/>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="address" className="col-sm-3 col-form-label mb-4">Address*</label>
          <div className="col-sm-5">
            <input className="form-control" type="text" 
            id="address" name="address" 
            onFocus={(e) => dispatch(msgActions.clearMessage())}
            required/>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="phone" className="col-sm-3 col-form-label mb-4">Phone Number*</label>
          <div className="col-sm-5">
            <input className="form-control" type="text" 
            id="phone" name="phone" placeholder="123-123-1234" 
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
            onInvalid={e => e.target.setCustomValidity('Please enter valid phone number in 123-123-1234 format.')}
            onInput={e => e.target.setCustomValidity('')}
            onChange={e => setPhone(e.target.value)}
            onFocus={(e) => dispatch(msgActions.clearMessage())}
            required/>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="dateofbirth" className="col-sm-3 col-form-label mb-4">Date of Birth*</label>
          <div className="col-sm-5">
            <input className="form-control" type="date" 
            id="dateofbirth" name="dateofbirth" 
            onFocus={(e) => dispatch(msgActions.clearMessage())}
            required/>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="zipcode" className="col-sm-3 col-form-label mb-4">Zipcode*</label>
          <div className="col-sm-5">
            <input className="form-control" type="text" 
            id="zipcode" name="zipcode" 
            pattern="[0-9]{5}" 
            onInvalid={e => e.target.setCustomValidity('Please enter valid zipcode.')}
            onInput={e => e.target.setCustomValidity('')}
            onChange={(e) => setZipcode(e.target.value)}
            onFocus={(e) => dispatch(msgActions.clearMessage())}
            required/>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="newPwd" className="col-sm-3 col-form-label mb-4">Password*</label>
          <div className="col-sm-5">
            <input className="form-control" type="password" 
            id="newPwd" name="newPwd" 
            onChange={(e) => setPassword(e.target.value)}
            onFocus={(e) => dispatch(msgActions.clearMessage())}
            required/>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="passwordcomfirm" className="col-sm-3 col-form-label mb-4">Password Comfirmation*</label>
          <div className="col-sm-5">
            <input className="form-control" type="password" 
            id="passwordcomfirm" name="passwordcomfirm" pattern={password}
            onInvalid={e => e.target.setCustomValidity('Password does not match.')}
            onInput={e => e.target.setCustomValidity('')}
            onFocus={(e) => dispatch(msgActions.clearMessage())}
            required/>
          </div>
          
          <input type = "hidden" name = "timestamp" id = 'timestamp'/>

        </div>

        <button className = "btn btn-primary mb-2 me-3" type="submit"
        onClick={(e) => setFromRegister(true)}>Register</button>
        <button className = "btn btn-primary mb-2" type="reset">Clear</button>
      </Form>
      {/* <p>Already have an account?  
        <span className="boldlink">
         Login
        </span>
        </p>  */}
    </div>
    
  
  );

};