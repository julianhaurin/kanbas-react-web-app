
import { useState, useEffect } from "react";
import { useParams } from "react-router"

import { Link } from "react-router-dom";

import * as quizzesClient from "./client"
import * as userClient from "../../Account/client";
import * as gradesClient from "../Grades/client"

// 
function QuizDetails() {
  
  // PARAMS
  const { cid, qid } = useParams();
  
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
  const [quiz, setQuiz] = useState<any>({});
  
  useEffect(() => {
    async function fetchQuiz() {
      const gotQuiz = await quizzesClient.fetchQuizByID(qid as string);
      console.log("got quiz: " + JSON.stringify(gotQuiz)) // %%%%%
      setQuiz(gotQuiz)
    };
    fetchQuiz();
  }, [qid]);
  
  // GRADES
  const [quizGrades, setQuizGrades] = useState<any>({});
  
  useEffect(() => {
    async function fetchQuizGrades() {
      let uid = await userClient.findMyID();
      const gotQuizGrades = await gradesClient.fetchQuizUserGrades(qid as string, uid);
      setQuizGrades(gotQuizGrades)
    };
    fetchQuizGrades();
  }, [qid]);
  
  
  return(
    
    <div className="w-75">
      
      {/* Edit and Preview Buttons */}
      <div>
        { role === "FACULTY" &&
          <div className="d-flex justify-content-center">
            <button className="m-2 btn btn-secondary"><Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Quiz`}>Preview</Link></button>
            <button className="m-2"><Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Editor`}>Edit</Link></button>
          </div>
        }
        {/* TODO: check number of attempts */}
        { role !== "FACULTY" &&
          <div className="d-flex justify-content-center">
            <button className="m-2"><Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Quiz`}>Take Quiz</Link></button>
          </div>
        }
      </div>
      
      <hr/>
      
      {/* Quiz Title */}
      <div className="fs-3">
        {quiz.name}
        {quizGrades && role === "STUDENT" &&
          <span className="float-end">
            Grade: {quizGrades.grade}
          </span>
        }
      </div>
      <div className="fs-5">
        {quiz.description}
      </div>
      <hr/>
      
      {/* Quiz details - CHECK WHAT ROLE NEEDED */}
      {quiz && quiz._id &&
        <div className="display-flex">
            <span className="fw-bold">Quiz Type: </span>{quiz.type || "UNKNOWN TYPE"} <br/>
            <span className="fw-bold">Points: </span>{quiz.points} <br/>
            <span className="fw-bold">Assignment Group: </span>{quiz.group} <br/>
            <span className="fw-bold">Shuffle Answers: </span>{quiz.shuffleAnswers.toString()} <br/>
            <span className="fw-bold">Time Limit: </span>{quiz.timeLimitMins} Minutes <br/>
            <span className="fw-bold">Multiple Attempts: </span>{quiz.hasMultipleAttempts.toString()} <br/>
            <span className="fw-bold">Number of Attempts: </span>{quiz.numAttempts} <br/>
            <span className="fw-bold">Show Correct Answers: </span>{quiz.showCorrectAnswers.toString()} <br/>
            <span className="fw-bold">Access Code: </span>'{quiz.accessCode}' <br/>
            <span className="fw-bold">One Question at a Time: </span>{quiz.oneQuestionAtATime.toString()} <br/>
            <span className="fw-bold">Webcam Required: </span>{quiz.isWebcamRequired.toString()} <br/>
            <span className="fw-bold">Lock Questions After Answering: </span>{quiz.lockQuestionsAfterAnswering.toString()} <br/>
            <span className="fw-bold">Number of Questions: </span>{quiz.questions.length} <br/>
        </div>
      }
      
      <br/>
      
      {/* Quiz Dates */}
      <div>
        <span className="fw-bold">
          {/* TODO: format this into columns, fix other details display as well ***** */}
          Due Available From Until 
        </span>
        <hr/>
        <span>
          {quiz.dueDate} | {quiz.availableDate} | {quiz.untilDate}
        </span>
      </div>
      
    </div>
  )
  
}

export default QuizDetails