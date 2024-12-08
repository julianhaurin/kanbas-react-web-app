
import { Routes, Route, Navigate } from "react-router";

import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import Users from "./Users";

import { useSelector } from "react-redux";

function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  return (
    <div id="wd-account-screen" className="d-flex">
      <div className="d-none d-md-block">
        <AccountNavigation />
      </div>
      
      <div className="flex-fill">
        <h1>Kanbas</h1>
        <Routes>
          <Route path="/" element={<Navigate to={currentUser ? "/Kanbas/Account/Profile" : "/Kanbas/Account/Signin"}  />} />
          <Route path="/Signin" element={currentUser ? <Navigate to="/Kanbas/Account/Profile" /> : <Signin />} />
          <Route path="/Profile" element={currentUser ? <Profile /> : <Signin />} />
          <Route path="/Signup" element={currentUser ? <Navigate to="/Kanbas/Account/Profile" /> : <Signup />} />
          <Route path="/Users" element={!currentUser ? <Navigate to="/Kanbas/Account/Signin" /> : <Users />} />
          <Route path="/Users/:uid" element={!currentUser ? <Navigate to="/Kanbas/Account/Signin" /> : <Users />} />
        </Routes>
      </div>
    </div>
  );
}

export default Account
