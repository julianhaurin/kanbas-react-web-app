
import { FaPlus } from "react-icons/fa6";

// todo: pass in editing functions
function QuizControls() {
  
  return(
    
    <div className="text-nowrap">
      
      <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end" data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Quiz
      </button>
      
    </div>
  )
  
}

export default QuizControls