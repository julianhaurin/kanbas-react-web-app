
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import * as courseClient from "../Courses/client"
import * as userClient from "../Account/client";

function Dashboard({ 
    courses, editingCourse, setEditingCourse, addNewCourse, deleteCourse, updateCourse, updateUserCourses, enrolling, setEnrolling, updateEnrollment, userCourses }: {
    courses: any[]; editingCourse: any; setEditingCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; 
    updateUserCourses: () => Promise<void>;
    enrolling: boolean; 
    setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
    userCourses: any[]
  })
  {
    
    const [role, setRole] = useState<string>("");
    const [userID, setUserID] = useState<string>("");
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    
    const fetchRole = async () => {
      try {
        let uid = userID
        if (!uid) { uid = "current" }
        const role = await userClient.findMyRoleWithID(uid);
        console.log("current user: " + JSON.stringify(currentUser))
        setRole(role);
      } catch (error) {
        console.error(error);
      }
    };
    
    const fetchId = async () => {
      try {
        const userID = await userClient.findMyID();
        setUserID(userID);
      } catch (error) {
        console.log("ERROR fetching id")
        console.error(error);
      }
    };
    
    useEffect(() => { fetchId(); }, [currentUser]);
    useEffect(() => { fetchRole(); }, [currentUser]);
  
  // // TODO: IS THIS STILL NECESSARY? 
  // const [allCourses, setAllCourses] = useState<any>(courseClient.fetchAllCourses())
  // const [displayEnrollmentOptions, setDisplayEnrollmentOptions] = useState<boolean>(false);
  
  // const enrollStudent = async (userID : string, courseID : string) => {
  //   await courseClient.enrollUserInCourse(userID, courseID)
  //   updateUserCourses()
  // }
  
  // const unenrollStudent = async (userID : string, courseID : string) => {
  //   await courseClient.unenrollUserFromCourse(userID, courseID)
  //   updateUserCourses()
  // }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {role && (role === "STUDENT" || role === "FACULTY") &&
        (<button onClick={async () => {setEnrolling(!enrolling); await updateUserCourses()}} className="float-end btn btn-primary m-2" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>)
      }
      
      
      <p>role : {currentUser.role}</p> {/* todo remove role if unnecessary */}
      <div>
        
        {/* ENROLLMENTS */}
        {/* <h5>
          { (currentUser.role === "STUDENT") && 
            <button 
              className="btn btn-primary" id="wd-add-new-course-click" 
              onClick={async () => { 
                setAllCourses(await fetchAllCourses()); 
                setDisplayEnrollmentOptions(!displayEnrollmentOptions); 
                console.log(displayEnrollmentOptions) }}>
              Enrollments 
            </button> }
        </h5> */}
        
        {/* <div>
          {displayEnrollmentOptions && Array.from(allCourses).map((course : any) => (
            <div>
              <span className="fs-3 my-4">{course.name}</span>
              {
                courses.some(x => x._id === course._id) ? 
                <span>
                  <div className="btn btn-danger float-end" onClick={() => { unenrollStudent(userID, course._id); setAllCourses(courseClient.fetchAllCourses()); setDisplayEnrollmentOptions(!displayEnrollmentOptions) }}>
                    Unenroll
                  </div>
                </span> :
                
                <span>
                  <div className="btn btn-primary float-end" onClick={() => { enrollStudent(userID, course._id); setAllCourses(courseClient.fetchAllCourses()); setDisplayEnrollmentOptions(!displayEnrollmentOptions) }}>
                    Enroll
                  </div>
                </span>
              }
            </div>
          ))}
        </div> */}
        
      </div>
      
      <hr />
      
      {
        (currentUser.role === "FACULTY") &&
        <div>
        <h5>New Course
            <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={addNewCourse} > Add </button>
            <button className="btn btn-warning float-end me-2"
                  onClick={updateCourse} id="wd-update-course-click">
            Update
          </button>
        </h5><br />
        
        
        <input    value={editingCourse.name} className="form-control mb-2" onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value }) } />
        <textarea value={editingCourse.description} className="form-control" onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value }) } />
        
        </div>
      }
      
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-4 row-cols-md-3 g-4 no-wrap">
          {courses.map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to={`/Kanbas/Courses/${course._id}/Home`}>
                  <img alt="" src="/images/Dashboard/course1.jpg" width="100%" height={160} />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {enrolling && (
                        <button onClick={(event) => {
                            event.preventDefault();
                            let isEnrolled = userCourses.findIndex((c : any) => c._id === course._id) >= 0
                            updateEnrollment(course._id, !isEnrolled);
                          }}
                          className={`btn ${ userCourses.findIndex((c : any) => c._id === course._id) >= 0 ? "btn-danger" : "btn-success" } float-end`} >
                          {userCourses.findIndex((c : any) => c._id === course._id) >= 0 ? "Unenroll" : "Enroll"}
                        </button>
                      )}
                    </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description}
                    </p>
                    <button className="btn btn-primary"> Go </button>
                    
                    {
                      (currentUser.role === "FACULTY") &&
                      <span>
                        <button 
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </button>
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setEditingCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </button>
                      </span>
                    }
                    
                  </div>
                </Link>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard
