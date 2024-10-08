
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
    
      <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </button>
      
      <div className="dropdown d-inline me-1 float-end">
        <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle mx-1"
          type="button" data-bs-toggle="dropdown">
          <GreenCheckmark />
          Publish All
        </button>
        <ul className="dropdown-menu">
          <li>
            <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item">
              <GreenCheckmark />
              Publish All Modules and Items
            </a>
          </li>
          <li>
            <a id="wd-publish-modules-only-button" className="dropdown-item">
              <GreenCheckmark />
              Publish Modules Only
            </a>
          </li>
          <li>
            <a id="wd-unpublish-all-modules-and-items" className="dropdown-item" href="#">
              <GreenCheckmark />
              Unpublish All Modules and Items
            </a>
          </li>
          <li>
            <a id="wd-unpublish-modules-only" className="dropdown-item" href="#">
              <GreenCheckmark />
              Unpublish Modules Only
            </a>
          </li>
        </ul>
      </div>
      
      <button id="wd-view-progress" className="btn btn-lg btn-secondary float-end mx-1" type="button">
          View Progress
        </button>
        
      <button id="wd-collapse-all" className="btn btn-lg btn-secondary float-end mx-1" type="button">
          Collapse All
      </button>
      
    </div>
);}

export default ModulesControls

