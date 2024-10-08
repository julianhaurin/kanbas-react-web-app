
import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      
      <div className="d-flex flex-column form-group justify-content-center w-25">
        <div className="m-1">
          <input placeholder="username" className="wd-username rounded-2 border-secondary form-control" />
        </div>
        <div className="m-1 ">
          <input placeholder="password" type="password" className="wd-password rounded-2 border-secondary form-control" />
        </div>
        <div className="m-1 ">
          <input placeholder="verify password" type="password" className="wd-password-verify rounded-2 border-secondary form-control" />
        </div>
        
        <button className="btn btn-primary">
          <Link  to="/Kanbas/Account/Profile" ><span className="text-white">Sign in</span></Link>
        </button>
        
      </div>

      <Link  to="/Kanbas/Account/Signin" >Sign in</Link>
    </div>
);}
