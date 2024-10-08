
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      
      <div className="d-flex flex-column form-group justify-content-center w-25">
        
        <div className="m-1">
          <input defaultValue="alice" placeholder="username" className="wd-username rounded-2 border-secondary form-control"/>
        </div>
        <div className="m-1">
          <input defaultValue="123"   placeholder="password" type="password" className="wd-password rounded-2 border-secondary form-control" />
        </div>
        <div className="m-1">
          <input defaultValue="Alice" placeholder="First Name" id="wd-firstname" className="rounded-2 border-secondary form-control" />
        </div>
        <div className="m-1">
          <input defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" className="rounded-2 border-secondary form-control" />
        </div>
        <div className="m-1">
          <input defaultValue="2000-01-01" type="date" id="wd-dob" className="rounded-2 border-secondary form-control" />
        </div>
        <div className="m-1">
          <input defaultValue="alice@wonderland" type="email" id="wd-email" className="rounded-2 border-secondary form-control"/>
        </div>
        <div className="m-1">
          <select defaultValue="FACULTY" id="wd-role" className="rounded-2 border-secondary form-control dropdown">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
        
        <button className="btn btn-danger">
          <Link  to="/Kanbas/Account/Signin" ><span className="text-white text-decoration-none">Sign Out</span></Link>
        </button>
        
      </div>
      
      
    </div>
);}
