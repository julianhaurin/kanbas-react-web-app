
import { useState, useEffect } from 'react';
import { useParams } from "react-router"

import * as quizzesClient from "./client"
import * as userClient from "../../Account/client";

import MultipleChoiceEditor from './Editors/MultipleChoiceEditor';
import TrueFalseEditor from './Editors/TrueFalseEditor';
import FITBEditor from './Editors/FITBEditor';

// 
function QuizEditor() {
  
  // PARAMS
  const { cid, qid } = useParams();
  
  // TABS
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabClick = (index : number) => {
    setActiveTab(index);
  };
  
  // QUIZ DATA
  const [quiz, setQuiz] = useState<any>({});
  
  useEffect(() => {
    async function fetchQuiz() {
      const gotQuiz = await quizzesClient.fetchQuizByID(qid as string);
      // console.log("QUIZ EDITOR: got quiz: " + JSON.stringify(gotQuiz)) // %%%%%QC: GOT QUIZ DATA:
      setQuiz(gotQuiz)
      setFormData(gotQuiz)
    };
    fetchQuiz();
  }, [qid]);
  
  // FORM DATA
  const [formData, setFormData] = useState({
    name: quiz.name,
    type: quiz.type,
    points: quiz.points,
    group: quiz.group,
    shuffleAnswers: quiz.shuffleAnswers,
    timeLimitMins: quiz.timeLimitMins,
    hasMultipleAttempts: quiz.numAttpemts > 1 ? true : false, // quiz.hasMultipleAttempts
    numAttempts: quiz.numAttempts,
    showCorrectAnswers: quiz.showCorrectAnswers,
    accessCode: quiz.accessCode,
    oneQuestionAtATime: quiz.oneQuestionAtATime,
    isWebcamRequired: quiz.isWebcamRequired,
    lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
  });
  
  // console.log("QUIZ EDITOR: default form data: " + JSON.stringify(formData)) // %%%%%
  
  const handleChange = (e : any) => { // React.ChangeEvent<HTMLInputElement>
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleSubmit = async (e : any) => {
    e.preventDefault();
    // TODO: SET QUIZ NOT UPDATING (form data is correct) - USING FORM DATA FOR NOW
    setQuiz(formData);
    console.log("QUIZ EDITOR: setting quiz with data: " + JSON.stringify(formData))
    console.log("QUIZ EDITOR: updating quiz with data: " + JSON.stringify(quiz))
    await quizzesClient.updateQuiz(qid as string, formData)
  };
  
  // QUESTION EDITING
  
  const [currQuestion, setCurrQuestion] = useState<any>({});
  
  const defaultQuestion = () => {
    return {
      questionTitle: "Question Title",
      questionPoints: 0,
      questionDescription: "Question Description ",
      
      questionType: "Multiple Choice",
      
      choices: [],
      correctAnswer: 0,
    }
  }
  
  const createQuestion = async (newQuestion : any) => {
    let newQuestions = quiz.questions as Array<any>
    newQuestions.push(newQuestion)
    
    const newQuiz = {
      ...quiz,
      questions: newQuestions
    };
    setQuiz(newQuiz);
    console.log("CREATING QUIZ QUESTION, NEW QUIZ: " + JSON.stringify(newQuiz))
    await quizzesClient.updateQuiz(qid as string, newQuiz)
  }
  
  const deleteQuestion = async (questionID : string) => {
    const newQuiz = {
      ...quiz,
      questions: Array.from(quiz.questions).filter((q: any) => 
        q._id !== questionID
      ),
    };
    setQuiz(newQuiz);
    console.log("DELETING QUIZ QUESTION, NEW QUIZ: " + JSON.stringify(newQuiz))
    await quizzesClient.updateQuiz(qid as string, newQuiz)
  }
  
  const updateQuestion = async (updatedQuestion : any, questionID : string) => {
    const newQuiz = {
      ...quiz,
      questions: Array.from(quiz.questions).map((q: any) => 
        q._id === questionID ? updatedQuestion : q
      ),
    };
    
    console.log("QE: NEW QUIZ W UPDATED QUESTION: " + JSON.stringify(newQuiz))
    setQuiz(newQuiz);
    await quizzesClient.updateQuiz(qid as string, newQuiz)
  }
  
  return(
    
    <div>
      
      {/* Tabs */}
      <div className="d-flex justify-content-center">
        <button onClick={() => handleTabClick(0)} className={`btn m-2 ${activeTab === 0 ? "active" : ""}`}>Details</button>
        <button onClick={() => handleTabClick(1)} className={`btn m-2 ${activeTab === 1 ? "active" : ""}`}>Questions</button>
      </div>
      
      {/* Tab Data */}
      <div>
      
        {/* Details */}
        {activeTab === 0 &&
          (
            <div>
              <div className="fs-3">Quiz Details</div>
              <hr/>
              
              {/* Quiz Editing Form */}
              <form onSubmit={handleSubmit}>
                <div className="m-1 fs-5">
                  <label className="fw-bold" htmlFor="name">Quiz Title:</label>
                  <input className="mx-2" type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="m-1 fs-5">
                  <label className="fw-bold" htmlFor="type">Quiz Type:</label>
                  <select className="mx-2" id="type" name="type" value={formData.type} onChange={handleChange}>
                    <option value="Graded Quiz">Graded Quiz</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                  </select>
                </div>
                <div className="m-1 fs-5">
                  <label className="fw-bold" htmlFor="points">Points:</label>
                  <input className="mx-2" type="number" id="points" name="points" value={formData.points} onChange={handleChange} />
                </div>
                <div className="m-1 fs-5">
                  <label className="fw-bold" htmlFor="group">Assignment Group:</label>
                  <select className="mx-2" id="group" name="group" value={formData.group} onChange={handleChange}>
                    <option value="Quizzes">Quizzes</option>
                    <option value="Exams">Exams</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Project">Project</option>
                  </select>
                </div>
                <div className="m-1 fs-5">
                  <label className="fw-bold" htmlFor="shuffleAnswers">Shuffle Answers:</label>
                  <input className="mx-2" id="shuffleAnswers" name="shuffleAnswers" type="checkbox" checked={formData.shuffleAnswers} onChange={handleChange}/>
                </div>
                <div className="m-1 fs-5">
                  <label className="fw-bold" htmlFor="timeLimit">Time Limit (minutes):</label>
                  <input className="mx-2" type="number" id="timeLimit" name="timeLimit" value={formData.timeLimitMins} onChange={handleChange} />
                </div>
                <div className="m-1 fs-5">
                  <span className="fw-bold">Multiple Attempts:  </span>{formData.hasMultipleAttempts ? "Yes" : "No"}<br/>
                </div>
                <div className="m-1 fs-5">
                  <label className="fw-bold" htmlFor="numAttempts">Number of Attempts:</label>
                  <input className="mx-2" type="number" id="numAttempts" name="numAttempts" value={formData.numAttempts} onChange={handleChange} />
                </div>
                <div className="m-1 fs-5">
                  <label className="fw-bold" htmlFor="showCorrect">Show Correct Answers:</label>
                  <input className="mx-2" id="showCorrect" name="showCorrect" type="checkbox" checked={formData.showCorrectAnswers} onClick={handleChange}/>
                </div>
                <div className="m-1 fs-5">
                  <label className="fw-bold" htmlFor="accessCode">Access Code:</label>
                  <input className="mx-2" type="text" id="accessCode" name="accessCode" value={formData.accessCode} onChange={handleChange}/>
                </div>
                <div className="m-1 fs-5">
                  <label className="fw-bold" htmlFor="oneAtATime">One Question at a Time:</label>
                  <input className="mx-2" id="oneAtATime" name="oneAtATime" type="checkbox" checked={formData.oneQuestionAtATime} onClick={handleChange}/>
                </div>
                <div className="m-1 fs-5">
                  <label className="fw-bold" htmlFor="webcamRequired">Webcam Required:</label>
                  <input className="mx-2" id="webcamRequired" name="webcamRequired" type="checkbox" checked={formData.isWebcamRequired} onClick={handleChange}/>
                </div>
                <div className="m-1 fs-5">
                  <label className="fw-bold" htmlFor="lockQuestionsAfterAnswering">Lock Questions After Answering:</label>
                  <input className="mx-2" id="lockQuestionsAfterAnswering" name="lockQuestionsAfterAnswering" type="checkbox" checked={formData.lockQuestionsAfterAnswering} onClick={handleChange}/>
                </div>
                
                {/* TODO: due dates */}
                
                <hr/>
                
                <button type="submit">Save</button>
                
              </form>
              
            </div>
          )
        }
        
        {/* Editor */}
        {activeTab === 1 &&
          (
            <div>
              <div className="fs-3">Quiz Questions</div>
              <hr/>
              
              {/* Questions List */}
              <div className='d-flex justify-content-center'>
                <ul className="list-group w-75">
                  {Array.from(quiz.questions).map((question : any) => (
                    <li className="list-group-item">
                      <div>
                        {/* id: {question._id} not sure why this is blank but updating seems fine*/}
                      </div>
                      <div>
                        <div className='my-2'>
                          <span className='fs-4'>{question.questionTitle}</span>
                          <span className='fs-4 float-end'>Points: {question.questionPoints}</span>
                        </div>
                        <br/>
                        <div className='fs-5 my-2'>
                          Description: {question.questionDescription}
                        </div>
                        <div className='fs-5 my-2'>
                          Type: {question.questionType}
                        </div>
                        
                        {/* Question Choices */}
                        <div>
                          {question.choices.map((choice : string) => (
                            <ol className="list-group">
                              <li className="list-group-item my-1">
                                {choice}
                              </li>
                            </ol>
                          ))}
                        </div>
                        <div className='fs-5 my-2'>
                          Answer: {question.correctAnswer}
                        </div>
                      </div>
                      
                      {/* Editing Buttons */}
                      <button id="wd-edit-question-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCurrQuestion({});
                          deleteQuestion(question._id)
                        }}
                        className="btn btn-danger me-2 float-end" >
                        Delete
                      </button>
                      
                      <button id="wd-edit-question-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCurrQuestion(question);
                        }}
                        className="btn btn-warning me-2 float-end" >
                        Edit
                      </button>
                      
                    </li>
                    
                  ))}
                </ul>
              </div>
              
              <hr/>
              
              {/* Question Editors */}
              <div className=''>
                
                {/* New Question Button */}
                <div className='d-flex justify-content-center'>
                  <button className="btn btn-secondary border border-secondary rounded-1 m-1"
                    onClick={() => {
                      let newQuestion = defaultQuestion()
                      createQuestion(newQuestion)
                      setCurrQuestion(newQuestion);
                    }}>
                    + New Question
                  </button>
                </div>
                
                <hr/>
                
                {/* TODO: way to switch between question types */}
                
                {/* Editor */}
                {currQuestion.questionType === "Multiple Choice" &&
                  <div className='d-flex justify-content-center'>
                    <MultipleChoiceEditor currQuestion={currQuestion} setCurrQuestion={setCurrQuestion} updateQuestion={updateQuestion}/>
                  </div>
                }
                {currQuestion.questionType === "True False" &&
                  <div className='d-flex justify-content-center'>
                    <TrueFalseEditor currQuestion={currQuestion} setCurrQuestion={setCurrQuestion} updateQuestion={updateQuestion}/>
                  </div>
                }
                {currQuestion.questionType === "Fill In The Blank" &&
                  <div className='d-flex justify-content-center'>
                    <FITBEditor currQuestion={currQuestion} setCurrQuestion={setCurrQuestion} updateQuestion={updateQuestion}/>
                  </div>
                }
                
                {/* Cancel/Save Buttons - TODO: necessary? just use ones in individual editors i think */}
                <hr/>
                {/* <div className='float-end'>
                  <button className="btn btn-secondary border border-secondary rounded-1 m-1">Cancel</button>
                  <button className="btn btn-danger border border-secondary rounded-1 m-1">Save</button>
                </div> */}
                
              </div>
              
            </div>
          )
        }
      </div>
      
    </div>
    
    
  )
  
}

export default QuizEditor
