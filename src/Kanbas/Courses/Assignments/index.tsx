
import { useParams } from "react-router";
// import * as db from "../../Database"; 
import { useEffect, useState   } from "react";

import AssignmentControls from "./AssignmentsControls"
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";

import { FaGripVertical } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaBook } from "react-icons/fa";
// import GreenCheckmark from "../Modules/GreenCheckmark";

import { useSelector, useDispatch } from "react-redux";

import * as coursesClient from "../client";
// import * as assignmentClient from "./client";

import { setAssignments, addAssignment, editAssignment, updateAssignment, deleteAssignment } from "./reducer";


function Assignments() {
  
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  //  const [assignments, setAssignments] = useState<any[]>(db.assignments); // remove *****
  
  const { cid } = useParams();
 
  const [assignmentName, setAssignmentName] = useState("");
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
    if (!cid) return;
    const newAssignment = { title: assignmentName, course: cid };
    const assignments = await coursesClient.createAssignmentForCourse(cid, newAssignment);
    dispatch(addAssignment(assignments));
  };
  
  const removeAssignment = (assignment: any) => {
    // setAssignments(assignments.filter((a : any) => a._id !== assignmentID));
    dispatch(deleteAssignment(assignment))
  };



  
  return(
  
    <div id="wd-assignments" className=" mx-3">
    
      <div className="my-2 ms-3">
        <AssignmentControls
          setAssignmentName={setAssignmentName} 
          assignmentName={assignmentName} 
          addAssignment={createAssignmentForCourse}
        />
      </div>
      
      <div >
        <div className="align-items-middle p-2 py-4 rounded-0 border border-bottom-0 border-secondary border-3" style={{ background: "#ececec"}}>
          <FaGripVertical className="align-middle"/>
          <MdOutlineArrowDropDown size={30}/>
          <span id="wd-assignments-title" className="fs-5 fw-bold align-middle">ASSIGNMENTS</span>
          
          <span className="float-end">
            <span className="border border-secondary rounded-4 p-2 align-middle">40% of Total</span>
            <span className="align-middle p-2"><AssignmentsControlButtons/></span>
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
                    <AssignmentControlButtons assignmentID={assignment._id} deleteAssignment={removeAssignment} />
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