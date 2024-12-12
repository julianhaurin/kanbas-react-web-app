
import { useState, useEffect } from "react";
import { useParams } from "react-router"
import { useNavigate } from "react-router";

import { Link } from "react-router-dom";

import * as quizzesClient from "./client"
import * as userClient from "../../Account/client";
import * as gradesClient from "../Grades/client"

// 
function QuizDetails() {
  
  // PARAMS
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  
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
  const [finalScore, setFinalScore] = useState<number>();
  
  useEffect(() => {
    async function fetchQuizGrades() {
      let uid = await userClient.findMyID();
      const gotQuizGrades = await gradesClient.fetchQuizUserGrades(qid as string, uid);
      setQuizGrades(gotQuizGrades)
    };
    fetchQuizGrades();
  }, [qid]);
  
  // grades score
  useEffect(() => {
    
    if (!quiz || !quizGrades || !quiz.questions || !quizGrades.answers) {return}
    
    let finalScoreTemp = 0
    console.log("quiz stuff " + JSON.stringify(quiz.questions))
    for (let ques of quiz.questions) {
      
      // get data
      let quesID = ques.questionID
      let qid = ques._id
      
      // console.log("quiz answers: " + JSON.stringify(quizGrades.answers))
      // console.log("quiz answers: " + JSON.stringify(quizGrades.answers))
      let answ : any = quizGrades.answers.find((anw : any) => anw.questionID === qid)
      let isCorrect = false
      
      console.log("answer: " + JSON.stringify(answ))
      
      // check answer
      if (ques.questionType === "Multiple Choice") {
        console.log("res: " + ques.mc_answerID)
        if (answ.mc_answerID === ques.mc_answerID) { isCorrect = true }
        
      } else if (ques.questionType === "True False") {
        if (answ.tf_answer.toString() === ques.tf_answer.toString()) { isCorrect = true }
      
      } else if (ques.questionType === "Fill In The Blank") {
        // console.log("res: " + ques.mc_answerID)
        // if (answ.fitb_answer.includes(ques.fitb_answer)) { isCorrect = true }
      
      }
      
      // add to score
      if (isCorrect) {
        console.log("IS CORRECt")
        finalScoreTemp += ques.questionPoints
      } else {
        console.log("IS NOT CORRECt")
      }
      
    }
    
    setFinalScore(finalScoreTemp)
    
  }, [quiz, quizGrades]);
  
  
  const [tooManyAttempts, setTooManyAttempts] = useState(false)
  
  // navigate to quiz
  const beginQuiz = async () => {
    
    let uid = await userClient.findMyID();
    const gotQuiz = await quizzesClient.fetchQuizByID(qid as string);
    const gotQuizGrades = await gradesClient.fetchQuizUserGrades(qid as string, uid);
    
    let newQuizGradesData = gotQuizGrades
    newQuizGradesData.attempts = newQuizGradesData.attempts + 1
    if (newQuizGradesData.attempts > gotQuiz.numAttempts) {
      setTooManyAttempts(true)
      return
    }
    
    console.log("***" + newQuizGradesData.attempts + " : " + gotQuiz.numAttempts)
    
    await setQuizGrades(newQuizGradesData)
    await gradesClient.updateQuizUserGrades(newQuizGradesData._id, newQuizGradesData)
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Quiz`)
    
  }
  
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
            <button className="m-2" type="button" onClick={beginQuiz}>Take Quiz</button>
          </div>
        }
      </div>
      
      <hr/>
      
      {/* Quiz Title */}
      <div className="fs-3">
        {quiz.name}
        {quizGrades && role === "STUDENT" &&
          <span className="float-end">
            Grade: {finalScore}
          </span>
        }
      </div>
      <div className="fs-5">
        {quiz.description}
      </div>
      <hr/>
      
      {tooManyAttempts && 
        <div>
          TOO MANY ATTEMPTS
        </div>
      }
      
      <div>
        Score : {finalScore}
      </div>
      
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
      
      <br/><br/><br/>
      
      {/* PREV QUIZ */}
      
      {quizGrades && quizGrades.answers && quizGrades.answers.length > 0 &&
        <div>
          QUIZ ANSWERS | {quizGrades.answers.length}
          <div>
              {/* {JSON.stringify(quiz)} */}
              {quiz.questions.map((ques : any) => {
              
                let qid = ques._id
                let answer : any = Array.from(quizGrades.answers).find((anw : any) => anw.questionID === qid) as any
                let isCorrect = false
                
                let answerStr = ""
                
                // check answer
                if (ques.questionType === "Multiple Choice") {
                  console.log("res: " + ques.mc_answerID)
                  if (answer.mc_answerID === ques.mc_answerID) { isCorrect = true }
                  if (quiz.questions.find((q : any) => q.mc_answerID === answer.mc_answerID)) { answerStr = quiz.questions.find((q : any) => q.mc_answerID === answer.mc_answerID).questionDescription }
                  
                } else if (ques.questionType === "True False") {
                  if (answer.tf_answer.toString() === ques.tf_answer.toString()) { isCorrect = true }
                  answerStr = answer.tf_answer.toString()
                
                } else if (ques.questionType === "Fill In The Blank") {
                  answerStr = answer.fitb_answer
                  // console.log("res: " + ques.mc_answerID)
                  // if (answ.fitb_answer.includes(ques.fitb_answer)) { isCorrect = true }
                
                }
            
              
                return (
                  <div>
                    <div className={isCorrect ? "fw-bold fs-4 bg-success" : "fw-bold fs-4 bg-danger"}>
                      {ques.questionTitle}
                    </div>
                    <div className="fs-5">
                      {ques.questionDescription} : {answerStr}
                    </div>
                  </div>
                )
                
            })}
          </div>
          <hr/>
        </div>
      }
      
      
    </div>
  )
  
}

export default QuizDetails