
import ModulesControls from "./ModulesControls";
import BsGripVertical from "./BsGripVertical";
import ModuleControlButtons from "./ModuleControlButtons ";
import LessonControlButtons from "./LessonControlButtons";

function Modules() {
  return (
    <div>
      <ModulesControls /><br /><br /><br /><br />
      
      <button id="wd-module-button" type="button">Collapse All</button>
      <button id="wd-module-button" type="button">View Progress</button>
      <select id="wd-select-one-genre">
         <option selected value="PUBLISH_ALL">Publish All</option>
         <option value="MODULE_1">Module 1</option>
         <option value="MODULE_2">Module 2</option>
      </select>
      <button id="wd-module-button" type="button">+ Module</button>
      
      <ul id="wd-modules" className="list-group rounded-0">
      
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical/>
            Week 1
            <ModuleControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
          
            <li className="wd-lesson list-group-item p-3 ps-1">
              <span className="wd-title">
                <BsGripVertical/>
                LEARNING OBJECTIVES
                <LessonControlButtons/>
              </span>
              <ul className="wd-content">
                <li className="wd-content-item list-group-item p-3 ps-1">Introduction to the course</li>
                <li className="wd-content-item list-group-item p-3 ps-1">Learn what is Web Development</li>
              </ul>
            </li>
            
            <li className="wd-reading list-group-item p-3 ps-1">
              <span className="wd-title">
                
              </span>
              <ul className="wd-content">
                <li className="wd-content-item list-group-item p-3 ps-1">Full Stack Developer - Chapter 1</li>
                <li className="wd-content-item list-group-item p-3 ps-1">Full Stack Developer - Chapter 2</li>
              </ul>
            </li>
            
            <li className="wd-slide list-group-item p-3 ps-1">
              <span className="wd-title">
              <BsGripVertical/>
                SLIDES
              <LessonControlButtons/>
              </span>
              <ul className="wd-content">
                <li className="wd-content-item list-group-item p-3 ps-1">Intro to Web Dev</li>
                <li className="wd-content-item list-group-item p-3 ps-1">Formatting Web Content</li>
              </ul>
            </li>
            
          </ul>
        </li>

        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">Week 2</div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <span className="wd-title">
              <BsGripVertical/>
                LEARNING OBJECTIVES
              <LessonControlButtons/>
              </span>
            </li>
          </ul>
        </li>
        
      </ul>
    </div>
  )

}

export default Modules
