
import { useParams } from "react-router";
// import * as db from "../../Database";
import { useEffect, useState   } from "react";

import AssignmentControls from "./AssignmentsControls"
import AssignmentControlButtons from "./AssignmentControlButtons";

import { FaGripVertical } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
// import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

import { useSelector } from "react-redux";

import * as coursesClient from "../client";
// import * as assignmentClient from "./client";

function Assignments() {
  const { cid, aid } = useParams();
  const [assignments, setAssignments] = useState<any[]>([]);
  // const assignments = db.assignments;
  
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchAssignments = async () => {
    try {
      const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
      setAssignments(assignments);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAssignments();
  }, [currentUser]);
  
  const createAssignmentForCourse = async () => {
    if (!cid || !aid) return;
    const newAssignment = { id: aid, course: cid };
    const assignments = await coursesClient.createAssignmentForCourse(cid, newAssignment);
    setAssignments(assignments)
  };


  
  return(
  
    <div id="wd-assignments" className=" mx-3">
    
      <div className="my-2 ms-3">
        <AssignmentControls/>
      </div>
      
      <div >
        <div className="align-items-middle p-2 py-4 rounded-0 border border-bottom-0 border-secondary border-3" style={{ background: "#ececec"}}>
          <FaGripVertical className="align-middle"/>
          <MdOutlineArrowDropDown size={30}/>
          <span id="wd-assignments-title" className="fs-5 fw-bold align-middle">ASSIGNMENTS</span>
          
          <span className="float-end">
            <span className="border border-secondary rounded-4 p-2 align-middle">40% of Total</span>
            <span className="align-middle p-2"><AssignmentControlButtons/></span>
          </span>
        </div>
        
        <ul id="wd-assignment-list" className="list-group">
          
          {assignments.map((assignment: any) => (
          
            <li className="wd-assignment-list-item list-group-item">
              <div className="row">
                <div className="col-2 align-self-center">
                  <div>
                    <FaGripVertical size={25} className="mx-1"/>
                    <FaBook color="green" size={25} className="mx-1"/>
                  </div>
                </div>
                <div className="col-8 align-self-center" >
                  <div>
                    <a className="wd-assignment-link text-decoration-none text-black fw-bold h5" href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                      {assignment.title}
                    </a>
                  </div>
                  <div>
                    <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | 
                  </div>
                  <div>
                    <b>Due</b> May 13 at 11:59pm | 100 pts
                  </div>
                </div>
                <div className="col-2 align-self-center">
                  <div className="float-end">
                    <span className="">
                      <FaCheckCircle size={25} className="text-success" />
                    </span>
                    <span className="">
                      <IoEllipsisVertical size={25} className="mx-3"/>
                    </span>
                  </div>
                </div>
              </div>
            </li>
          
          ))}
          
          {/* <li className="wd-assignment-list-item list-group-item">
            <div className="row">
              <div className="col-2 align-self-center">
                <div>
                  <FaGripVertical size={25} className="mx-1"/>
                  <FaBook color="green" size={25} className="mx-1"/>
                </div>
              </div>
              <div className="col-8 align-self-center" >
                <div>
                  <a className="wd-assignment-link text-decoration-none text-black fw-bold h5" href="#/Kanbas/Courses/1234/Assignments/123">
                    A2
                  </a>
                </div>
                <div>
                  <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | 
                </div>
                <div>
                  <b>Due</b> May 13 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="col-2 align-self-center">
                <div className="float-end">
                  <span className="">
                    <FaCheckCircle size={25} className="text-success " />
                  </span>
                  <span className="">
                    <IoEllipsisVertical size={25} className="mx-3"/>
                  </span>
                </div>
              </div>
            </div>
          </li>
          
          <li className="wd-assignment-list-item list-group-item">
            <div className="row">
              <div className="col-2 align-self-center">
                <div>
                  <FaGripVertical size={25} className="mx-1"/>
                  <FaBook color="green" size={25} className="mx-1"/>
                </div>
              </div>
              <div className="col-8 align-self-center" >
                <div>
                  <a className="wd-assignment-link text-decoration-none text-black fw-bold h5" href="#/Kanbas/Courses/1234/Assignments/123">
                    A3
                  </a>
                </div>
                <div>
                  <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | 
                </div>
                <div>
                  <b>Due</b> May 13 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="col-2 align-self-center">
                <div className="float-end">
                  <span className="">
                    <FaCheckCircle size={25} className="text-success " />
                  </span>
                  <span className="">
                    <IoEllipsisVertical size={25} className="mx-3"/>
                  </span>
                </div>
              </div>
            </div>
          </li> */}

          
        </ul>
      </div>
    </div>
  
  )
}

export default Assignments