
import { Routes, Route, Navigate } from "react-router";



import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";

function Account() {
  return (
    <div id="wd-account-screen" className="d-flex">
      <div className="d-none d-md-block">
        <AccountNavigation />
      </div>
      
      <div className="flex-fill">
        <h1>Kanbas</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default Account
