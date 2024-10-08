
import { Link } from "react-router-dom";

function Signin() {
  return (
    <div id="wd-signin-screen">
    
      <h3>Sign in</h3>
      
      <div className="d-flex flex-column form-group justify-content-center w-25">
      
        <div className="m-1">
          <input className="wd-username rounded-2 border-secondary form-control" placeholder="username"/>
        </div>
        <div className="m-1 ">
          <input className="wd-password rounded-2 border-secondary form-control" placeholder="password" type="password"/>
        </div>
        
        <button className="btn btn-primary">
          <Link  id="wd-signin-btn" to="/Kanbas/Dashboard"><span className="text-white">Sign in</span></Link>
        </button>
        
      </div>
      
      <Link  id="wd-signup-link" to="/Kanbas/Account/Signup">Sign up</Link>
      
    </div>
);}

export default Signin