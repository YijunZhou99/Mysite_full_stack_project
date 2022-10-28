import React from "react";
import { LoginForm } from "./loginForm";
import { RegisterForm } from "./registerForm";
import "./landing.css";

const Landing = () => {
  return (
    <div className="landing">
      <div className="ui fixed pointing menu">
        <div className="ui item">
          <h2>My Site</h2>
        </div>
      </div>

      <div className = "form">
        <LoginForm />
      </div>
      <div className = "form">
      <br/>
      <br/>
      <br/>
        <RegisterForm /> 
      </div>

    </div>

  
  );

};

export default Landing;