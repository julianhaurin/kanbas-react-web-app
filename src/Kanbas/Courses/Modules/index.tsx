
import ModulesControls from "./ModulesControls";
import BsGripVertical from "./BsGripVertical";
import ModuleControlButtons from "./ModuleControlButtons ";
import LessonControlButtons from "./LessonControlButtons";

function Modules() {
  return (
    <div>
      <ModulesControls /><br /><br /><br /><br />
      
      <ul id="wd-modules" className="list-group rounded-0">
      
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical/>
            Week 1
            <ModuleControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
          
            <li className="wd-lesson list-group-item p-3 ps-1">
              <ul className="wd-content">
                <li className="wd-content-item list-group-item p-3 ps-1">
                  <span className="float-left"><BsGripVertical/></span>
                  <span className="">LEARNING OBJECTIVES</span>
                  <LessonControlButtons/>
                </li>
                <li className="wd-content-item list-group-item p-3 ps-1">
                  <span className="float-left"><BsGripVertical/></span>
                  <span className="">Introduction to the course</span>
                  <LessonControlButtons/>
                </li>
                <li className="wd-content-item list-group-item p-3 ps-1">
                  <span className="float-left"><BsGripVertical/></span>
                  <span className="">Learn what is Web Development</span>
                  <LessonControlButtons/>
                </li>
                <li className="wd-content-item list-group-item p-3 ps-1">
                  <span className="float-left"><BsGripVertical/></span>
                  <span className="">Full Stack Developer - Chapter 1</span>
                  <LessonControlButtons/>
                </li>
                <li className="wd-content-item list-group-item p-3 ps-1">
                  <span className="float-left"><BsGripVertical/></span>
                  <span className="">Full Stack Developer - Chapter 2</span>
                  <LessonControlButtons/>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical/>
            Week 2
            <ModuleControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
          
            <li className="wd-lesson list-group-item p-3 ps-1">
              <ul className="wd-content">
                <li className="wd-content-item list-group-item p-3 ps-1">
                  <span className="float-left"><BsGripVertical/></span>
                  <span className="">LEARNING OBJECTIVES</span>
                  <LessonControlButtons/>
                </li>
                <li className="wd-content-item list-group-item p-3 ps-1">
                  <span className="float-left"><BsGripVertical/></span>
                  <span className="">Chapter 3</span>
                  <LessonControlButtons/>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        
      </ul>
    </div>
  )

}

export default Modules
