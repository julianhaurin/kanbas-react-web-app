
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

// import { FaPlus } from "react-icons/fa6";


// todo: pass in editing functions
function QuizContextMenu(
  {quizID} : {quizID : string}
) {
  
  const { cid } = useParams()
  
  return(
    
    <div className="text-nowrap">
      <div>
        <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quizID}`}></Link>
      </div>
    </div>
  )
  
}

export default QuizContextMenu