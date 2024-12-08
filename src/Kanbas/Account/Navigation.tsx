
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Account navigation sidebar
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const { pathname } = useLocation();
  const active = (path: string) => (pathname.includes(path) ? "active bg-white text-danger border-0 border-left" : "border-0");
  
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0 mx-2">
    
      {!currentUser &&
        <div className="wd list-group fs-5 rounded-0"> 
          <Link to={`/Kanbas/Account/Signin`} className={`list-group-item my-0 border ${active("Signin")}`}>Sign In</Link>
          <Link to={`/Kanbas/Account/Signup`} className={`list-group-item my-0 border ${active("Signup")}`}>Sign Up</Link>
        </div>
      }
      {currentUser && (
          <Link to={`/Kanbas/Account/Profile`} className={`list-group-item my-0 border ${active("Profile")}`}>Profile</Link>
      )}
      
      {currentUser && currentUser.role === "ADMIN" && (
        <Link to={`/Kanbas/Account/Users`} className={`list-group-item my-0 border ${active("Users")}`}>Users</Link>
      )}
    </div>
);}
