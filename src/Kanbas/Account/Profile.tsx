
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Profile() {
  
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kanbas/Account/Signin");
    setProfile(currentUser);
  };
  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => { fetchProfile(); }, []);
  
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      
      {profile && (
        <div className="d-flex flex-column form-group justify-content-center w-25">
          <input defaultValue={profile.username} id="wd-username" className="form-control mb-2"
                 onChange={(e) => setProfile({ ...profile, username:  e.target.value })}/>
          <input defaultValue={profile.password} id="wd-password" className="form-control mb-2"
                 onChange={(e) => setProfile({ ...profile, password:  e.target.value })}/>
          <input defaultValue={profile.firstName} id="wd-firstname" className="form-control mb-2"
                 onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}/>
          <input defaultValue={profile.lastName} id="wd-lastname" className="form-control mb-2"
                 onChange={(e) => setProfile({ ...profile, lastName:  e.target.value })}/>
          <input defaultValue={profile.dob} id="wd-dob" className="form-control mb-2"
                 onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date"/>
          <input defaultValue={profile.email} id="wd-email" className="form-control mb-2"
                 onChange={ (e) => setProfile({ ...profile, email: e.target.value })}/>
          <select onChange={(e) => setProfile({ ...profile, role:  e.target.value })}
                 className="form-control mb-2" id="wd-role">
            <option value="USER">User</option>            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>      <option value="STUDENT">Student</option>
          </select>
          <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
            Sign out
          </button>
        </div>
      )}
      
      {/* <div className="d-flex flex-column form-group justify-content-center w-25">
        
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
        
      </div> */}
      
      
    </div>
);}
