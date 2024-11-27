
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";
// import * as db from "../Database";

function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      navigate("/Kanbas/Dashboard");
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div id="wd-signin-screen">
    
      <h3>Sign in</h3>
      
      <div className="d-flex flex-column form-group justify-content-center w-25">
      
        <input defaultValue={credentials.username}
               onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
               className="form-control mb-2" placeholder="username" id="wd-username" />
        <input defaultValue={credentials.password}
               onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
               className="form-control mb-2" placeholder="password" type="password" id="wd-password" />
        <button onClick={signin} id="wd-signin-btn" className="btn btn-primary w-100" > Sign in </button>

        
      </div>
      
      <Link  id="wd-signup-link" to="/Kanbas/Account/Signup">Sign up</Link>
      
    </div>
);}

export default Signin