
import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";

import * as client from "../../Account/client";

// Popup Account Description and Editor within PeopleTable
export default function PeopleDetails() {
  
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };
  
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };
  
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const [editing, setEditing] = useState(false);
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, email: email, firstName: firstName, lastName: lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    // navigate(-1);
  };

  
  if (!uid) return null;
  
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={() => { setEditing(false); navigate(-1) }} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" /> </button>
      <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
      
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil onClick={() => setEditing(true)}
              className="float-end fs-5 mt-2 wd-edit" /> 
        )}
        {editing && (
          <FaCheck onClick={() => saveUser()}
              className="float-end fs-5 mt-2 me-2 wd-save" /> 
        )}
        {!editing && (
          <div className="wd-name"
               onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}</div>
        )}
        {user && editing && (
          <div>
            <b className="text-black fs-6">Name: </b>
            <input className="form-control w-50 wd-edit-name"
              defaultValue={`${user.firstName} ${user.lastName}`}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") { saveUser(); }}
              }/>
          </div>
        )}
      </div>
      
      <div>
        <b>Email: </b>
        <span className="wd-email">
          {!editing && (
            <span className="wd-email" onClick={() => setEditing(true)}>
              {user.email}
            </span>
          )}
          {user && editing && (
            <span>
              <input className="form-control w-50 wd-edit-email flex"
                defaultValue={`${user.email}`}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { saveUser(); }}}
              />
            </span>
          )}
          
        </span> <br/>
        
        <b>Roles:</b>           <span className="wd-roles">         {user.role}         </span> <br/>
        <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br/>
        <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br/>
        <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span>
      </div>
      
      <hr />
      
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" >Delete</button>
      <button onClick={() => navigate(-1)}
              className="btn btn-secondary float-start float-end me-2 wd-cancel" >Cancel</button>
    </div> 
  ); 
}