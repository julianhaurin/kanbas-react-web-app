
import { useState, useEffect } from 'react';
import { useParams } from "react-router"
import { useNavigate  } from 'react-router-dom';

import * as quizzesClient from "./client"
// import * as userClient from "../../Account/client";

import MultipleChoiceEditor from './Editors/MultipleChoiceEditor';
// 
function QuizEditor() {
  
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  
  // TABS
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabClick = (index : number) => {
    setActiveTab(index);
  };
  
  // QUIZ DATA
  const [quiz, setQuiz] = useState<any>({});
  const [quizPoints, setQuizPoints] = useState<number>(0);
  
  useEffect(() => {
    async function fetchQuiz() {
      const gotQuiz = await quizzesClient.fetchQuizByID(qid as string);
      // console.log("QUIZ EDITOR: got quiz: " + JSON.stringify(gotQuiz)) // %%%%%QC: GOT QUIZ DATA:
      setQuiz(gotQuiz)
      setFormData(gotQuiz)
      updateQuizPoints();
    };
    fetchQuiz();
  }, [qid]);
  
  useEffect(() => {
    updateQuizPoints();
  }, [quiz]);
  
  // FORM DATA
  const [formData, setFormData] = useState({
    name: quiz.name,
    description: quiz.description,
    type: quiz.type,
    points: quizPoints,
    group: quiz.group,
    shuffleAnswers: quiz.shuffleAnswers,
    timeLimitMins: quiz.timeLimitMins,
    hasMultipleAttempts: quiz.numAttempts > 1 ? true : false, // quiz.hasMultipleAttempts
    numAttempts: quiz.numAttempts,
    showCorrectAnswers: quiz.showCorrectAnswers,
    accessCode: quiz.accessCode,
    oneQuestionAtATime: quiz.oneQuestionAtATime,
    isWebcamRequired: quiz.isWebcamRequired,
    lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
    published: quiz.published
  });
  
  // console.log("QUIZ EDITOR: default form data: " + JSON.stringify(formData)) // %%%%%
  
  const updateQuizPoints = () => {
    let qPoints = 0
    if (quiz && quiz.questions) { quiz.questions.map((q : any) => { qPoints += q.questionPoints }) }
    setQuizPoints(qPoints)
  }
  
  const handleChange = (e : any) => { // React.ChangeEvent<HTMLInputElement>
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    updateQuizPoints()
  };
  
  const handleSubmit = async (e : any) => {
    e.preventDefault();
    // TODO: SET QUIZ NOT UPDATING (form data is correct) - USING FORM DATA FOR NOW
    setQuiz(formData);
    console.log("QUIZ EDITOR: setting quiz with data: " + JSON.stringify(formData))
    console.log("QUIZ EDITOR: updating quiz with data: " + JSON.stringify(quiz))
    await quizzesClient.updateQuiz(qid as string, formData)
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)
  };
  
  const handleSubmitAndPublish = async (e : any) => {
    e.preventDefault();
    formData.published = true
    setQuiz(formData);
    await quizzesClient.updateQuiz(qid as string, formData)
    navigate(`/Kanbas/Courses/${cid}/Quizzes/`)
  };
  
  const handleCancel = (e : any) => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/`)
  }
  
  // QUESTION EDITING
  
  const [currQuestion, setCurrQuestion] = useState<any>({});
  
  const defaultQuestion = () => {
    return {
      questionID: Date.now().toString(),
      questionTitle: "Question Title",
      questionPoints: 0,
      questionDescription: "Question Description ",
      
      questionType: "Multiple Choice",
      
      mc_choices: [],
      mc_answerIdx: 0,
      mc_answerID: "",
      tf_answer: true,
      fitb_answers: [],
    }
  }
  
  const createQuestion = async (newQuestion : any) => {
    console.log("adding new question: " + JSON.stringify(newQuestion))
    let newQuestions = quiz.questions as Array<any>
    newQuestions.push(newQuestion)
    
    const newQuiz = {
      ...quiz,
      questions: newQuestions
    };
    setQuiz(newQuiz);
    console.log("CREATING QUIZ QUESTION, NEW QUIZ: " + JSON.stringify(newQuiz))
    await quizzesClient.updateQuiz(qid as string, newQuiz)
    await updateQuizData()
    
    let addedQuestion = quiz.questions.find((q : any) => q.questionID === newQuestion.questionID)
    setCurrQuestion(addedQuestion)
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
    await updateQuizData()
  }
  
  const updateQuestion = async (updatedQuestion : any, questionID : string) => {
    console.log("updating q with choices: " + JSON.stringify(updatedQuestion.mc_choices))
    console.log("q " + JSON.stringify(updatedQuestion) + " : " + JSON.stringify(questionID))
    console.log("quiz " + JSON.stringify(quiz))
    const newQuiz = {
      ...quiz,
      questions: Array.from(quiz.questions).map((q: any) => {
        if (q.questionID === questionID) { console.log("FOUND Q TO UPDATE: " + q.questionID); return updatedQuestion }
        console.log("skip")
        return q
      }),
    };
    
    console.log("QE: NEW QUIZ W UPDATED QUESTION: " + JSON.stringify(newQuiz))
    updateQuizPoints()
    setQuiz(newQuiz);
    await quizzesClient.updateQuiz(qid as string, newQuiz)
    await updateQuizData()
  }
  
  const updateQuizData = async () => {
    let updatedQuizData = await quizzesClient.fetchQuizByID(qid as string)
    console.log("updating quiz: " + JSON.stringify(updatedQuizData))
    setQuiz(updatedQuizData);
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
                  <label className="fw-bold" htmlFor="description">Quiz Description:</label>
                  <textarea className="mx-2" id="description" name="description" value={formData.description} onChange={handleChange} />
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
                  <label className="fw-bold" htmlFor="points">Points: {quizPoints}</label>
                  {/* <input className="mx-2" type="number" id="points" name="points" value={formData.points} onChange={handleChange} /> */}
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
                  <label className="fw-bold" htmlFor="oneQuestionAtATime">One Question at a Time:</label>
                  <input className="mx-2" id="oneQuestionAtATime" name="oneQuestionAtATime" type="checkbox" checked={formData.oneQuestionAtATime} onClick={handleChange}/>
                </div>
                <div className="m-1 fs-5">
                  <label className="fw-bold" htmlFor="webcamRequired">Webcam Required:</label>
                  <input className="mx-2" id="webcamRequired" name="webcamRequired" type="checkbox" checked={formData.isWebcamRequired} onClick={handleChange}/>
                </div>
                <div className="m-1 fs-5">
                  <label className="fw-bold" htmlFor="lockQuestionsAfterAnswering">Lock Questions After Answering:</label>
                  <input className="mx-2" id="lockQuestionsAfterAnswering" name="lockQuestionsAfterAnswering" type="checkbox" checked={formData.lockQuestionsAfterAnswering} onClick={handleChange}/>
                </div>
                <div className="m-1 fs-5">
                  <label className="fw-bold" htmlFor="published">Is Published:</label>
                  <input className="mx-2" id="published" name="published" type="checkbox" checked={formData.published} onClick={handleChange}/>
                </div>
                
                {/* TODO: due dates */}
                
                <hr/>
                
                {/* <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}>Save</Link> */}
                <button className='btn btn-danger mx-2' type="submit">Save</button>
                <button className='btn btn-danger mx-2' onClick={handleSubmitAndPublish}>Save and Publish</button>
                <button className='btn btn-secondary mx-2' onClick={handleCancel}>Cancel</button>
                
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
                        
                        {/* MULTIPLE CHOICE */}
                        {question.questionType === "Multiple Choice" &&
                          <div>
                            <div className='fs-5 my-2'>
                              Choices: 
                              {Array.from(question.mc_choices).map((choice : any) => (
                                <ol className="list-group">
                                  <li className="list-group-item my-1">
                                    {choice.choiceDescription}
                                  </li>
                                </ol>
                              ))}
                            </div>
                            <div className='fs-5 my-2'>
                              Answer: 
                              <span>{question.mc_choices.find((choice : any) => choice.choiceID === question.mc_answerID) ? question.mc_choices.find((choice : any) => choice.choiceID === question.mc_answerID).choiceDescription : ""}</span>
                            </div>
                          </div>
                        }
                        
                        {/* TRUE FALSE */}
                        {question.questionType === "True False" &&
                        <div>
                          <div className='fs-5 my-2'>
                            Answer: {question.tf_answer.toString()}
                          </div>
                        </div>
                        }
                        
                        {/* FITB FALSE */}
                        {question.questionType === "Fill In The Blank" &&
                        <div className='fs-5 my-2'>
                          Answers:
                          <div>
                            {Array.from(question.fitb_answers).map((answer : any) => (
                              <ol className="list-group">
                                <li className="list-group-item my-1">
                                  {answer.fitbAnswer}
                                </li>
                              </ol>
                            ))}
                          </div>
                        </div>
                        }
                        
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
                    onClick={async () => {
                      let newQuestion = defaultQuestion()
                      await createQuestion(newQuestion)
                      // setCurrQuestion(newQuestion);
                    }}>
                    + New Question
                  </button>
                </div>
                
                <hr/>
                
                {/* TODO: way to switch between question types */}
                {/* {console.log("curr ques" + JSON.stringify(currQuestion))} */}
                {currQuestion.questionType && 
                  <div className='d-flex justify-content-center'>
                    <MultipleChoiceEditor currQuestion={currQuestion} setCurrQuestion={setCurrQuestion} updateQuestion={updateQuestion} updateQuizPoints={updateQuizPoints}/>
                  </div>
                }
                
                
                {/* Editor */}
                
                {/* {currQuestion.questionType === "Multiple Choice" &&
                  <div className='d-flex justify-content-center'>
                    <MultipleChoiceEditor currQuestion={currQuestion} setCurrQuestion={setCurrQuestion} updateQuestion={updateQuestion} updateQuizPoints={updateQuizPoints}/>
                  </div>
                } */}
                
                {/* {currQuestion.questionType === "True False" &&
                  <div className='d-flex justify-content-center'>
                    <TrueFalseEditor currQuestion={currQuestion} setCurrQuestion={setCurrQuestion} updateQuestion={updateQuestion} updateQuizPoints={updateQuizPoints}/>
                  </div>
                }
                {currQuestion.questionType === "Fill In The Blank" &&
                  <div className='d-flex justify-content-center'>
                    <FITBEditor currQuestion={currQuestion} setCurrQuestion={setCurrQuestion} updateQuestion={updateQuestion}/>
                  </div>
                } */}
                
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
