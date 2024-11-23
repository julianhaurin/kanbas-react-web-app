


// import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

function AssignmentControlButtons(
  { assignmentID, deleteAssignment  }: 
  { assignmentID: string; deleteAssignment: (assignmentID: string) => void;}) {
  return (
    <span>
      <span className="">
        <FaCheckCircle size={25} className="text-success" />
      </span>
      <span className="">
        <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteAssignment(assignmentID)}/>
      </span>
      <span>
        <FaPencil onClick={() => {}} className="text-primary me-3" />
      </span>
      {/* <span className="">
        <IoEllipsisVertical size={25} className="mx-3"/>
      </span> */}
    </span>
);}

export default AssignmentControlButtons