
// Mutliple Choice Editor

import { useState, useEffect } from 'react';
import { useParams } from "react-router"

function MultipleChoiceEditor(
  { currQuestion, setCurrQuestion, updateQuestion, updateQuizPoints } :
  { currQuestion: any, 
    setCurrQuestion : (question : any) => void, 
    updateQuestion : (newQuestion : any,  questionID : string) => Promise<void>,
    updateQuizPoints : () => void,
  }
) 
{
  
  // PARAMS
  const { cid, qid } = useParams();
  
  // QUESTION DATA
  // const [currQuestion, setCurrQuestion] = useState<any>({});
  
  // FORM DATA
  const [formData, setFormData] = useState({
    questionID: currQuestion.questionID,
    questionTitle: currQuestion.questionTitle,
    questionPoints: currQuestion.questionPoints,
    questionDescription: currQuestion.questionDescription,
    questionType: currQuestion.questionType,
    mc_choices: currQuestion.mc_choices,
    mc_answerIdx: currQuestion.mc_answerIdx,
    mc_answerID: currQuestion.mc_answerID,
    tf_answer: currQuestion.tf_answer,
    fitb_answers: currQuestion.fitb_answers,
  });
  
  const handleChange = (e : any) => { // React.ChangeEvent<HTMLInputElement>
    const { name, type, checked, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  // const handleChoiceAnswerChange = (e : any) => {
  //   const { name, type, checked, value } = e.target;
  //   console.log("editing: " + name + " : " + value)
  //   let newChoices = choices.map((choice : any) => {
  //     if (choice.choiceID === name) { choice.choiceDescription = value }
  //     return choice
  //   })
  //   setChoices(newChoices)
  // };
  
  const handleTFChanges = (e : any) => {
    const { name, type, checked, value } = e.target;
    if (value === "true") {
      setFormData((prevData) => ({
        ...prevData,
        ["tf_answer"]: true,
      }));
    }
    if (value === "false") {
      setFormData((prevData) => ({
        ...prevData,
        ["tf_answer"]: false,
      }));
    }
  }
  
  const handleChoicesChanges = (e : any) => {
    const { name, type, checked, value } = e.target;
    // name = _id, value = choiceID - radio input (obsolete)
    
    let newChoices = choices.map((choice : any) => {
      if (choice.choiceID === name) { choice.choiceDescription = value }
      return choice
    })
    setChoices(newChoices)
  };
  
  const handleFITBChoicesChanges = (e : any) => {
    const { name, type, checked, value } = e.target;
    
    let newAnswers = fitbChoices.map((choice : any) => {
      if (choice.fitbID === name) { choice.fitbAnswer = value }
      return choice
    })
    setFITBChoices(newAnswers)
  };
  
  const handleSubmit = async (e : any) => {
    let newformData = formData
    newformData.mc_choices = choices
    setFormData(newformData)
    
    console.log("MCE: Submitting form data: " + JSON.stringify(formData) + " : " + currQuestion._id + " : " + currQuestion.questionID)
    
    await updateQuestion(formData, currQuestion.questionID) // ***** currQuestion._id
    setCurrQuestion({})
  };
  
  const handleCancel = () => {
    setCurrQuestion({})
  }
  
  // MULTIPLE CHOICE OPTIONS
  let [choices, setChoices] = useState<Array<any>>(currQuestion.mc_choices)
  
  const addChoice = async () => {
    const newDefaultChoice =  { choiceDescription: 'New Choice', choiceID: Date.now().toString() }
    const newChoices = [...choices, newDefaultChoice]
    setChoices(newChoices);
    console.log("added new choice: " + JSON.stringify(newChoices) + " : " + JSON.stringify(newDefaultChoice))
    
    let newFormData = formData
    newFormData.mc_choices = choices
    await updateQuestion(formData, currQuestion.questionID) // ***** currQuestion._id
  };
  
  const removeChoice = async () => {
    choices.pop()
    setChoices(choices);
    console.log("removed new choice: " + JSON.stringify(choices))
    
    let newFormData = formData
    newFormData.mc_choices = choices
    await updateQuestion(formData, currQuestion.questionID) // ***** currQuestion._id
  };
  
  // FITB OPTIONS
  let [fitbChoices, setFITBChoices] = useState<Array<any>>(currQuestion.fitb_answers)

  const addFITBChoice = async () => {
    const newDefaultChoice =  { fitbAnswer: 'New Answer', fitbID: Date.now().toString() }
    const newFITBChoices = [...fitbChoices, newDefaultChoice]
    setFITBChoices(newFITBChoices);
    
    let newFormData = formData
    newFormData.fitb_answers = fitbChoices // newFormData.fitb_answers.map(() => {fitbChoices})
    console.log("updating " + currQuestion._id)
    await updateQuestion(formData, currQuestion.questionID) // ***** currQuestion._id
  };
  
  const removeFITBChoice = async () => {
    fitbChoices.pop()
    setFITBChoices(fitbChoices);
    
    let newFormData = formData
    newFormData.fitb_answers = fitbChoices
    await updateQuestion(formData, currQuestion.questionID) // ***** currQuestion._id
  };
  
  return(
    <div className="w-75">
      
      {/* Editor {d-flex justify-content-center} */}
      <div className="border border-1">
        <div>
          {/* Multiple Choice Editor */}
        </div>
        <form onSubmit={handleSubmit}>
          
          {/* Title */}
          <div>
            <div className="m-2 fs-5">
              <label className="fw-bold" htmlFor="name">Question Title:</label>
              <input className="mx-2" type="text" id="name" name="questionTitle" value={formData.questionTitle} onChange={handleChange} />
            </div>
            <div className="m-2 fs-5">
              <label className="fw-bold" htmlFor="points">Points:</label>
              <input className="mx-2" type="number" id="points" name="questionPoints" value={formData.questionPoints} onChange={handleChange} />
            </div>
            <div className="m-2 fs-5">
              <label className="fw-bold" htmlFor="description">Question Description:</label>
              <textarea className="mx-2" id="description" name="questionDescription" value={formData.questionDescription} onChange={handleChange} />
            </div>
            
            <div className="m-2 fs-5 fw-bold">
              Type:
              <select className="mx-2" id="questionType" name="questionType" value={formData.questionType} onChange={handleChange}>
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="True False">True False</option>
                <option value="Fill In The Blank">Fill In The Blank</option>
              </select>
            </div>
            
            
            {formData.questionType === "Multiple Choice" &&
              <div>
                <span className="m-2 fs-5 fw-bold">Choices: </span>
                <span>
                  <button type="button" onClick={removeChoice}>-</button>
                  <button type="button" onClick={addChoice}>+</button>
                </span>
                {choices.map((choice : any) => (
                  <div className='mx-4'>
                    {/* id: '{choice.choiceID}' */}
                    <input className="mx-2" type="text" id={choice.choiceID} name={choice.choiceID} value={choice.choiceDescription} onChange={handleChoicesChanges} />
                    <input className="mx-2" type="radio" id={choice.choiceID} name="mc_answerID" value={choice.choiceID} onChange={handleChange} />
                  </div>
                ))}
                
              </div>
            }
            
            {formData.questionType === "True False" &&
              <div className='fs-4'>
                <div className='mx-4'>
                  <label htmlFor='trueChoice'>True</label>
                  <input className="mx-2" type="radio" id="trueChoice" name="tf_answer" value="true" checked={formData.tf_answer} onChange={handleTFChanges} />
                </div>
                <div className='mx-4'>
                  <label htmlFor='trueChoice'>False</label>
                  <input className="mx-2" type="radio" id="trueChoice" name="tf_answer" value="false" checked={!formData.tf_answer} onChange={handleTFChanges} />
                </div>
              </div>
            }
            
            {formData.questionType === "Fill In The Blank" &&
              <div>
                <span className="m-2 fs-5 fw-bold">FITB Options: </span>
                <span>
                  <button type="button" onClick={removeFITBChoice}>-</button>
                  <button type="button" onClick={addFITBChoice}>+</button>
                </span>
                {fitbChoices.map((answer : any) => (
                  <div className='mx-4'>
                    {/* id: '{answer.fitbID}' */}
                    <input className="mx-2" type="text" id={answer.fitbID} name={answer.fitbID} value={answer.fitbAnswer} onChange={handleFITBChoicesChanges} />
                  </div>
                ))}
                
              </div>
            }
            
            <div className="m-2 fs-5">
              <label className="fw-bold" htmlFor="answer">
              Answer: 
                <span>{formData.mc_choices && formData.mc_choices.find((choice : any) => choice.choiceID === formData.mc_answerID) ? formData.mc_choices.find((choice : any) => choice.choiceID === formData.mc_answerID).choiceDescription : ""}</span>
              </label>
              {/* <input className="mx-2" type="number" id="answer" name="correctAnswer" value={formData.mc_answerID} onChange={handleChange} /> */}
            </div>
            
          </div>
          
        </form>
        
        {/* Cancel and Save Buttons */}
        <div className='float-end'>
          <button type="button" className="btn btn-secondary border border-secondary rounded-1 m-1" onClick={handleCancel}>Cancel</button>
          <button className="btn btn-danger border border-secondary rounded-1 m-1" onClick={handleSubmit}>Save</button>
        </div>
        
        
      </div>
      
    </div>
  )
  
}

export default MultipleChoiceEditor
