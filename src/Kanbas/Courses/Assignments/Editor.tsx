
import { useParams } from "react-router";
import * as db from "../../Database";

import { Link } from "react-router-dom";

import { FaX } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignments = db.assignments;
  
  const currAssignments = assignments.filter((assignment: any) => assignment.course === cid && assignment._id === aid)
  let currAssignment = currAssignments[0]
  
  return (
    
    <div id="wd-assignments-editor" className="p-2 input-group px-3" style={{maxWidth: 1000}}>
    
      <div className="w-100">
        <label htmlFor="wd-name" className="form-control border-0 ps-0">Assignment Name</label>
        <input id="wd-name" className="rounded-1 border border-secondary p-1 w-100"  value={currAssignment.title} /><br /><br />
      </div>
      
      <div className="w-100" style={{height: 300}}>
        <textarea id="wd-description" className="w-100 p-2 h-100">
          {currAssignment.description}
        </textarea>
      </div>
      
      <div className="w-100">
        <br />
        <div className="input-group row">
          <label htmlFor="wd-points" className="input-prepend col-4 align-self-center text-end">Points</label>
          <input id="wd-points" className="form-control col-8 mx-2 rounded-1" value={100} />
        </div>
        
        <br/>
        <div className="input-group row">
          <label htmlFor="wd-points" className="input-prepend col-4 align-self-center text-end">Assignment Group</label>
          <div className="col-8">
            <select id="wd-group" className="form-select rounded-1">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </div>
        </div>
        
        <br/>
        <div className="input-group row">
          <label htmlFor="wd-display-grade-as" className="input-prepend col-4 align-self-center text-end">Display Grade As</label>
          <div className="col-8">
            <select id="wd-display-grade-as" className="form-select rounded-1">
              <option value="PERCENTAGE">PERCENTAGE</option>
              <option value="FRACTION">FRACTION</option>
              <option value="DECIMAL">DECIMAL</option>
            </select>
          </div>
        </div>
        
        
        
        
        <br/>
        <div className="input-group row">
          <label htmlFor="wd-submission-type" className="input-prepend col-4 text-end">Submission Type</label>
          <div className="col-8 border rounded-1 p-3">
            <select id="wd-submission-type col-8" className="form-select">
              <option value="ONLINE">Online</option>
            </select>
            
            <div className="form-group my-3">
              
              <span className="fw-bold">Online Entry Options</span>
              
              <div className="form-check my-3">
                <input type="checkbox" id="wd-text-entry" className="form-check-input"/>
                <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label><br/>
              </div>
              
              <div className="form-check my-3">
                <input type="checkbox" id="wd-website-url" className="form-check-input"/>
                <label htmlFor="wd-website-url" className="form-check-label">Website URL</label><br/>
              </div>
              
              <div className="form-check my-3">
                <input type="checkbox" id="wd-media-recordings" className="form-check-input"/>
                <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label><br/>
              </div>
              
              <div className="form-check my-3">
                <input type="checkbox" id="wd-student-annotation" className="form-check-input"/>
                <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label><br/>
              </div>
              
              <div className="form-check my-3">
                <input type="checkbox" id="wd-file-upload" className="form-check-input"/>
                <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label><br/>
              </div>
            
            </div>
            
            
          </div>
        </div>

        <br/>
          
        <div className="input-group row">
          <label htmlFor="wd-submission-type" className="input-prepend col-4 text-end">Assign</label>
          <div className="col-8 border rounded-1 p-2">
            <div className="">
              <p><label htmlFor="wd-assign-to" className="fw-bold align-self-center">Assign to</label></p>
              <div className="border p-2">
                <input id="wd-assign-to" value="Everyone" className="bg-secondary p-1 border-0 w-25 align-self-center align-middle px-2"></input>
                <FaX className="bg-secondary p-2" size={32}></FaX>
              </div>
              
            </div>
            
            <div>
              <div>
                <label htmlFor="wd-due-date"><span className="fw-bold">Due</span></label>
              </div>
              <div className="input-group">
                <input type="" id="wd-due-date" className="form-control" value={currAssignment.due_date}></input>
                <div className="input-group-append bg-secondary align-self-center p-3">
                  <FaCalendarAlt/>
                </div>
              </div>
              
              <div className="row">
              
                <div className="col-6">
                  <div>
                    <label htmlFor="wd-available-from"><span className="fw-bold">Available from</span></label>
                  </div>
                  <div className="input-group">
                    <input type="" id="wd-available-from" className="form-control" value={currAssignment.available_date}></input>
                    <div className="input-group-append bg-secondary align-self-center p-3">
                      <FaCalendarAlt/>
                    </div>
                  </div>
                </div>
                
                <div className="col-6">
                  <div>
                    <label htmlFor="wd-available-until"><span className="fw-bold">Until</span></label>
                  </div>
                  <div className="input-group">
                    <input type="" id="wd-available-until" className="form-control" value={currAssignment.until_date}></input>
                    <div className="input-group-append bg-secondary align-self-center p-3">
                      <FaCalendarAlt/>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            
            
            
            
            
            
            </div>
          </div>
          

        <hr />
        
        
        <div style={{textAlign: 'right'}}>
          <button className="btn">
            <Link  id="wd-signin-btn" to={`/Kanbas/Courses/${cid}/Assignments`}><span className="btn btn-secondary border border-secondary rounded-1">Cancel</span></Link>
          </button>
          <button className="btn">
            <Link  id="wd-signin-btn" to={`/Kanbas/Courses/${cid}/Assignments`}><span className="btn btn-danger border border-secondary rounded-1">Save</span></Link>
          </button>
        </div>
      
      </div>
      
    </div>
);}

export default AssignmentEditor
