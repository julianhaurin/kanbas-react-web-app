
import { useState, useEffect } from "react";
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom";

import * as quizzesClient from "./client"
import * as userClient from "../../Account/client";
import * as gradesClient from "../Grades/client"


// Displays provided quiz
function Quiz() {
  
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  
  // ROLE and ID
  const [role, setRole] = useState<string>("");
  const [UID, setUID] = useState<string>("")
  const fetchRoleAndID = async () => {
    try {
      const role = await userClient.findMyRole();
      const UID = await userClient.findMyID();
      setRole(role);
      setUID(UID)
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => { fetchRoleAndID(); }, []);
  
  // QUIZ DATA
  const [quiz, setQuiz] = useState<any>({});
  useEffect(() => {
    async function fetchQuiz() {
      const gotQuiz = await quizzesClient.fetchQuizByID(qid as string);
      setQuiz(gotQuiz)
    };
    fetchQuiz();
  }, [qid]);
  
  // QUIZ ANSWERS
  let [questionIndex, setQuestionIndex] = useState<number>(0)
  
  const [quizAnswers, setQuizAnswers] = useState<Array<any>>([]);
  useEffect(() => {
    async function retrieveDefaultAnswers() {
      const quizData = await quizzesClient.fetchQuizByID(qid as string);
      const initQuizAnswers = quizData.questions.map((ques : any) => {
          return {
            questionID: ques._id,
            questionType: ques.questionType,
            
            mc_answerIdx: 0,
            mc_answerID: "",
            tf_answer: false,
            fitb_answer: ""
          }
        })
      setQuizAnswers(initQuizAnswers)
    }
    retrieveDefaultAnswers();
  }, [quiz]);
  
  const defaultQuizGrade = () => {
    let defaultAnswers = new Array<any>
    return {
      quiz: qid,
      user: UID,
      answers: defaultAnswers,
      grade: 0,
      attempts: 0
    }
  }
  let quizGradeData = defaultQuizGrade();
  
  const handleChange = (e : any) => {
    const { name, type, checked, value, id } = e.target;
    console.log("handling change: " + name + " : " + value + " : " + JSON.stringify(quizAnswers))
    setQuizAnswers((prevData : Array<any>) => (
      prevData.map((question : any) => {
        if (question.questionID === name) {
          question.mc_answerID = value;
        }
        return question
      })
    ));
  };
  
  const handleSubmit = async (e : any) => {
    e.preventDefault();
    quizGradeData.answers = quizAnswers
    console.log("NEED TO UPDATE QUIZ DATA WITH: " + JSON.stringify(quizGradeData))
    
    const gradesExist = await gradesClient.existsQuizUserGrades(qid as string, UID as string)
    if (gradesExist) {
      await gradesClient.updateQuizUserGrades(gradesExist._id, quizGradeData)
    } else {
      await gradesClient.createGrade(quizGradeData)
    }
    
    // <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}>Submit</Link>
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)
    
  };
  
  return(
    
    <div>
      
      {/* Quiz Details */}
      <div>
        <div>
          {quiz.name}
        </div>
        <div>
          {quiz.description}
        </div>
      </div>
      
      {/* Quiz Questions */}
      <div>
      {/* If oneQuestionAtATime, filter questions based on current index - TODO: use ID bum */}
      {quiz.questions && 
       quiz.questions.filter((ques : any) => {
                                if (quiz.oneQuestionAtATime === true) {return quiz.questions.findIndex((q : any) => q === ques) === questionIndex}
                                return true
                              }).map((ques : any) => 
          (
          <div className="d-flex justify-content-center">
            <div className="w-75">
            
              {/* Question Details */}
              <div className="fs-3 m-2">
                {ques.questionTitle}
                <span className="float-end">Points: {ques.questionPoints}</span>
              </div>
              
              <div className="fs-5 m-2">
                {ques.questionDescription}
              </div>
              
              {/* Question Answer Form */}
              <div className="fs-5 m-2">
                {ques.questionType === "Multiple Choice" &&
                  (
                    <div className="mx-4">
                      {/* Multiple Choice Options */}
                      <div>
                        {ques.mc_choices && ques.mc_choices.map((choice : any) => 
                          (
                            <div>
                              {/* TODO: FIX IDS */}
                              <input type="radio" id={choice._id} name={ques._id} value={choice._id} onClick={handleChange}></input>
                              <label className="m-2" htmlFor={choice._id}>{choice.choiceDescription}</label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )
                }
                
                {ques.questionType === "True False" &&
                  (
                    <div>
                      <input type="radio" id="trueID" name="tf_choice" value="true" onClick={handleChange}></input>
                      <label className="m-2" htmlFor="trueID">True</label>
                      <input type="radio" id="falseID" name="tf_choice" value="false" onClick={handleChange}></input>
                      <label className="m-2" htmlFor="falseID">False</label>
                    </div>
                  )
                }
                
                {ques.questionType === "Fill In The Blank" &&
                  (
                    <div>
                      <input type="input" id={ques._id} name={ques._id} value={"test"} onClick={handleChange}></input>
                      <label className="m-2" htmlFor={ques._id}>{ques.choiceDescription}</label>
                    </div>
                  )
                }
              </div>
              
              
              <hr/>
            </div>
          </div>
        ))
      }
      </div>
      
      {/* <div>{questionIndex}</div> */}
      
      {/* Prev - Next Buttons */}
      {quiz && quiz.oneQuestionAtATime &&
        (<div className="d-flex justify-content-center">
          <button className="btn btn-danger m-2" onClick={() => { if (questionIndex > 0) { setQuestionIndex(questionIndex -= 1) }}}>Previous</button>
          <button className="btn btn-danger m-2" onClick={() => { if (questionIndex < quiz.questions.length - 1) { setQuestionIndex(questionIndex += 1) }}}>Next</button>
        </div>)
      }
      
      
      {/* Submit Button */}
      <div className="w-75">
        <button className="btn btn-danger float-end btn-lg" onClick={handleSubmit}>Submit</button>
      </div>
      
    </div>
    
  )
  
}

export default Quiz