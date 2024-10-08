
import { FaSearch, FaPlus } from "react-icons/fa"

function AssignmentsControls() {
  
  return(
    <div id="wd-assignment-controls" className="row text-nowrap">
      
      {/* Search Bar */}
      <div className="col-6 align-self-center border" style={{height: "45px"}}>
        <span className="">
          <FaSearch/>
        </span>
        <input type="search" className="border-0 m-2 mb-3 fs-5"  placeholder="Search..."></input>
      </div>
      
      {/* Right Side Buttons */}
      <div className="col-6 align-self-center">
        <button id="wd-add-assignment" className="btn btn-lg btn-danger m-1 p-2 rounded-1 float-end" type="button">
          <FaPlus className="position-relative me-1 " style={{ bottom: "2px" }} />
          Assignment
        </button>
        <button id="wd-add-group" className="btn btn-lg btn-secondary my-1 p-2 rounded-1 float-end" type="button">
          <FaPlus className="position-relative me-1" style={{ bottom: "2px", color: "white" }} />
          Group
        </button>
      </div>
      
    </div>
  )
  
}

export default AssignmentsControls
