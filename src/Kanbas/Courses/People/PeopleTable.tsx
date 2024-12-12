
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";
import { Link, useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import * as db from "../../Database";

import * as coursesClient from "../../Courses/client"

import { useState, useEffect } from "react";

function PeopleTable({ users = [] }: { users?: any[] }) {
  
  const { cid } = useParams();
  // const { users, enrollments } = db;
  
  const [courseUsers, setCourseUsers] = useState(new Array<any>)
  useEffect(()=> {
    const fetchUsers = async () => {
      if (cid) { const cUsers = await coursesClient.findUsersForCourse(cid as string); setCourseUsers(cUsers); }
      
      // console.log("USERS: " + JSON.stringify(cUsers))
    }
    fetchUsers()
  }, [cid]);
  
  return (
    <div id="wd-people-table">
      <table className="table table-striped">
      
        <thead>
          <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
        </thead>
        
        <tbody>
        
        <PeopleDetails/>
        
        {courseUsers.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <Link to={`/Kanbas/Account/Users/${user._id}`} className="text-decoration-none">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.firstName}</span> <span className="wd-last-name">{user.lastName}</span>
                </Link>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div> 
  )
}

export default PeopleTable