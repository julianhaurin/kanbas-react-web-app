
// Mutliple Choice Editor

import { useState, useEffect } from 'react';
import { useParams } from "react-router"

function MultipleChoiceEditor(
  { currQuestion, setCurrQuestion, updateQuestion } :
  { currQuestion: any, setCurrQuestion : (question : any) => void, updateQuestion : (newQuestion : any, questionID : string) => Promise<void> }
) 
{
  
  // PARAMS
  const { cid, qid } = useParams();
  
  // QUESTION DATA
  // const [currQuestion, setCurrQuestion] = useState<any>({});
  
  // FORM DATA
  const [formData, setFormData] = useState({
    questionTitle: currQuestion.questionTitle,
    questionPoints: currQuestion.questionPoints,
    questionDescription: currQuestion.questionDescription,
    questionType: currQuestion.questionType,
    choices: currQuestion.choices,
    correctAnswer: currQuestion.correctAnswer,
  });
  
  const handleChange = (e : any) => { // React.ChangeEvent<HTMLInputElement>
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleSubmit = async (e : any) => {
    console.log("MCE: Submitting form data: " + JSON.stringify(formData) + " : " + currQuestion._id)
    await updateQuestion(formData, currQuestion._id)
    setCurrQuestion({})
  };
  
  const handleCancel = () => {
    setCurrQuestion({})
  }
  
  return(
    <div className="w-75">
      
      {/* Editor {d-flex justify-content-center} */}
      <div className="border border-1">
        <div>
          Multiple Choice Editor
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
              <input className="mx-2" type="text" id="description" name="questionDescription" value={formData.questionDescription} onChange={handleChange} />
            </div>
            
            <div>TYPE: {formData.questionType}</div>
            
            <div>
              {formData.choices.map((choice : string) => (
                <div>{choice}</div>
              ))}
            </div>
            <div className="m-2 fs-5">
              <label className="fw-bold" htmlFor="answer">Answer:</label>
              <input className="mx-2" type="number" id="answer" name="correctAnswer" value={formData.correctAnswer} onChange={handleChange} />
            </div>
            
          </div>
          
        </form>
        
        {/* Cancel and Save Buttons */}
        <div className='float-end'>
          <button className="btn btn-secondary border border-secondary rounded-1 m-1" onClick={handleCancel}>Cancel</button>
          <button className="btn btn-danger border border-secondary rounded-1 m-1" onClick={handleSubmit}>Save</button>
        </div>
        
        
      </div>
      
    </div>
  )
  
}

export default MultipleChoiceEditor
