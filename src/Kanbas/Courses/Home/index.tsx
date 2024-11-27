
import Modules from "../Modules";
import CourseStatus from "./Status";

import { useState, useEffect } from "react";
import * as userClient from "../../Account/client";

function Home() {
  
  // todo: copied from dashboard code, remove here
  const [role, setRole] = useState<string>("");
  
  const fetchRole = async () => {
    try {
      const role = await userClient.findMyRole();
      setRole(role);
    } catch (error) {
      console.log("ERROR fetching role")
      console.error(error);
    }
  };
  
  useEffect(() => { fetchRole(); }, []);
  
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill">
        <Modules />
      </div>
      <div className="d-none d-md-block mx-4">
        {
          (role === "FACULTY") &&
          <CourseStatus />
        }
      </div>
    </div>
  );
}

export default Home
