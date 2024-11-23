
import { useState, useEffect } from "react";
import { useParams } from "react-router";
// import * as db from "../../Database";

import * as coursesClient from "../client";
import * as modulesClient from "./client";

import ModulesControls from "./ModulesControls";
import BsGripVertical from "./BsGripVertical";
import ModuleControlButtons from "./ModuleControlButtons ";
import LessonControlButtons from "./LessonControlButtons";

import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

function Modules() {
  const { cid } = useParams();
  // const [modules, setModules] = useState<any[]>(db.modules);
  
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  
  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };
  
  
  useEffect(() => {
    const fetchModules = async () => {
      const modules = await coursesClient.findModulesForCourse(cid as string);
      dispatch(setModules(modules));
    };
    fetchModules();
  }, [cid, dispatch]);
  
  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };
  
  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };
  
  
  const [moduleName, setModuleName] = useState("");
  // const addModule = () => {
  //   setModules([ ...modules, { _id: new Date().getTime().toString(),
  //                                    name: moduleName, course: cid, lessons: [] } ]);
  //   setModuleName("");
  // };
  
  // const deleteModule = (moduleId: string) => {
  //   setModules(modules.filter((m) => m._id !== moduleId));
  // };
  
  // const editModule = (moduleId: string) => {
  //   setModules(modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)));
  // };
  // const updateModule = (module: any) => {
  //   setModules(modules.map((m) => (m._id === module._id ? module : m)));
  // };
  
  
  return (
    <div>
      <ModulesControls 
        setModuleName={setModuleName} 
        moduleName={moduleName} 
        addModule={createModuleForCourse}
      />
      <br /><br /><br /><br />
      
      <ul id="wd-modules" className="list-group rounded-0">
        {modules.map((module: any) => (
        
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical/>
              { module.editing && (
                <input className="form-control w-50 d-inline-block"
                  onChange={(e) =>
                    dispatch(
                      updateModule({ ...module, name: e.target.value })
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name}/>
              )}
              
              {module.name}
              <ModuleControlButtons moduleId={module._id}
                  deleteModule={(moduleId) => removeModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))} />
            </div>
            <ul className="wd-lessons list-group rounded-0">
                
                <li className="wd-lesson list-group-item p-3 ps-1">
                  {module.lessons && (
                    <ul className="wd-content">
                      {module.lessons.map((lesson: any) => (
                        <li className="wd-content-item list-group-item p-3 ps-1">
                          <span className="float-left"><BsGripVertical/></span>
                          <span className="">{lesson.name}</span>
                          <LessonControlButtons/>
                        </li>
                        // <li className="wd-content-item list-group-item p-3 ps-1">
                        //   <span className="float-left"><BsGripVertical/></span>
                        //   <span className="">Introduction to the course</span>
                        //   <LessonControlButtons/>
                        // </li>
                        // <li className="wd-content-item list-group-item p-3 ps-1">
                        //   <span className="float-left"><BsGripVertical/></span>
                        //   <span className="">Learn what is Web Development</span>
                        //   <LessonControlButtons/>
                        // </li>
                        // <li className="wd-content-item list-group-item p-3 ps-1">
                        //   <span className="float-left"><BsGripVertical/></span>
                        //   <span className="">Full Stack Developer - Chapter 1</span>
                        //   <LessonControlButtons/>
                        // </li>
                        // <li className="wd-content-item list-group-item p-3 ps-1">
                        //   <span className="float-left"><BsGripVertical/></span>
                        //   <span className="">Full Stack Developer - Chapter 2</span>
                        //   <LessonControlButtons/>
                        // </li>
                      ))}
                    </ul>
                  )}
                </li>
                
            </ul>
          </li>
        ))}
        
        {/* <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
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
        </li> */}
        
      </ul>
    </div>
  )

}

export default Modules
