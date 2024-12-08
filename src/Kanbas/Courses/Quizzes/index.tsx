
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

import * as quizzesClient from "./client"
import * as userClient from "../../Account/client";

import QuizControls from "./QuizControls";

import { FaGripVertical, FaBan, FaCheck } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";

function Quizzes() {
  
  // PARAMS
  const { cid } = useParams();
  
  // ROLE
  // todo: copied from dashboard code, remove here
  const [role, setRole] = useState<string>("");
  const fetchRole = async () => {
    try {
      const role = await userClient.findMyRole();
      setRole(role);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => { fetchRole(); }, []);
  
  // QUIZZES
  const [quizzes, setQuizzes] = useState<any[]>([]);
  // const dispatch = useDispatch(); // ?????
  
  useEffect(() => {
    async function fetchQuizzes() {
      const gotQuizzes = await quizzesClient.fetchQuizzesForCourse(cid as string);
      setQuizzes(gotQuizzes)
    };
    fetchQuizzes();
  }, [cid]);
  
  return(
    <div>
    
      {/* Role (REMOVE) */}
      <div>
        ROLE: {role}
      </div>
      
      {/* Quiz control buttons */}
      <div>
        {(role === "FACULTY") &&
          <div>
            <QuizControls/>
            <br /><br /><br /><br />
          </div>
        }
      </div>
      
      {/* List of Quizzes */}
      <div>
        {/* Quiz list header */}
        <div className="align-items-middle p-2 py-4 rounded-0 border border-bottom-0 border-secondary border-3" style={{ background: "#ececec"}}>
            <FaGripVertical className="align-middle"/>
            <MdOutlineArrowDropDown size={30}/>
            <span id="wd-assignments-title" className="fs-5 fw-bold align-middle">Quizzes</span>
            
            <span className="float-end">
              {/* <span className="align-middle p-2"><AssignmentsControlButtons/></span> */}
            </span>
        </div>
        
        <div>
          
        <ul id="wd-modules" className="list-group rounded-0">
          {quizzes.map((quiz: any) => (
            <li className="wd-module list-group-item p-0 my-0 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                
                {/* Name */}
                <Link className="wd-dashboard-course-link text-decoration-none text-dark" to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
                  {quiz.name}
                </Link>
                
                
                {/* Control Buttons */}
                <span className="float-end">
                  {quiz.published ? <FaCheck/> : <FaBan/>}
                </span>
                
              </div>
            </li>
          ))}
        </ul>
          
        </div>
      
      </div>
      
      
      
    
    </div>
  )
  
}

export default Quizzes