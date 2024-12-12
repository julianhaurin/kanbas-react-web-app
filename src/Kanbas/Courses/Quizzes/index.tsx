
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

import * as quizzesClient from "./client"
import * as userClient from "../../Account/client";

// import QuizControls from "./QuizControls";

import { FaGripVertical, FaBan, FaCheck } from "react-icons/fa";
import { FaPlus, FaEllipsisVertical, FaPencil, FaDeleteLeft } from "react-icons/fa6";
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
  
  useEffect(() => {
    async function fetchQuizzes() {
      const gotQuizzes = await quizzesClient.fetchQuizzesForCourse(cid as string);
      setQuizzes(gotQuizzes)
    };
    fetchQuizzes();
  }, [cid]);
  
  const updateQuizzes = async () => {
    const gotQuizzes = await quizzesClient.fetchQuizzesForCourse(cid as string);
    setQuizzes(gotQuizzes);
  }
  
  const createQuiz = async () => {
    const defaultQuiz = {
      name: "New Quiz",
      description: "New Description",
      published: false,
      questions: new Array<any>,
      course: cid,
      
      type: "Graded Quiz",
      points: 0,
      group: "Quizzes",
      timeLimitMins: 20,
      hasMultipleAttempts: false,
      numAttempts: 1,
      showCorrectAnswers: true,
      accessCode: "",
      oneQuestionAtATime: true,
      isWebcamRequired: false,
      lockQuestionsAfterAnswering: true,
      dueDate: "",
      availableDate: "",
      untilDate: "",
      shuffleAnswers: true,
    }
    await quizzesClient.createQuiz(defaultQuiz);
    await updateQuizzes();
  }
  
  const deleteQuiz = async (qid : string) => {
    await quizzesClient.deleteQuiz(qid);
    await updateQuizzes();
  }
  
  const togglePublished = async (qid : string) => {
    let quizData = await quizzesClient.fetchQuizByID(qid as string);
    quizData.published = !quizData.published
    await quizzesClient.updateQuiz(qid as string, quizData)
    await updateQuizzes();
  }
  
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
            <div className="text-nowrap">
              <button onClick={createQuiz} id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Quiz
              </button>
            </div>
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
          {quizzes.filter((quiz: any) => role !== "FACULTY" ? quiz.published : true).map((quiz: any) => (
            <li className="wd-module list-group-item p-0 my-0 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                
                {/* Name */}
                <Link className="wd-dashboard-course-link text-decoration-none text-dark" to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
                  {quiz.name}
                </Link>
                
                
                {/* Control Buttons */}
                {role === "FACULTY" &&
                  <span className="float-end">
                    <button className="mx-2">
                      <FaEllipsisVertical/>
                    </button>
                    <button className="mx-2">
                      <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}><FaPencil/></Link>
                    </button>
                    <button className="mx-2" onClick={() => deleteQuiz(quiz._id)}>
                      <FaDeleteLeft/>
                    </button>
                    <button onClick={() => { togglePublished(quiz._id) }}>
                      {quiz.published ? <FaCheck/> : <FaBan/>}
                    </button>
                  </span>
                }
                
                
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