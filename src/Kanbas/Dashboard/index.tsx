
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import { useSelector } from "react-redux";
// import * as db from "../Database";

import * as courseClient from "../Courses/client"
import * as userClient from "../Account/client";

function Dashboard({ 
  courses, course, setCourse, addNewCourse, deleteCourse, updateCourse, updateCourses }: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; 
  updateCourses: () => void; })
  
  {
    
    const [role, setRole] = useState<string>("");
    const [userID, setUserID] = useState<string>("");
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    
    const fetchRole = async () => {
      try {
        const role = await userClient.findMyRole();
        setRole(role);
      } catch (error) {
        console.log("ERROR fetching role")
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
    
    useEffect(() => { fetchRole(); }, [currentUser]);
    useEffect(() => { fetchId(); }, [currentUser]);
  
  // const [courses, setCourses] = useState<any[]>(db.courses);
  // const [course, setCourse] = useState<any>({
  //   _id: "0", name: "New Course", number: "New Number",
  //   startDate: "2023-09-10", endDate: "2023-12-15",
  //   image: "/images/reactjs.jpg", description: "New Description"
  // });
  
  // const addNewCourse = () => {
  //   const newCourse = { ...course,
  //                       _id: new Date().getTime().toString() };
  //   setCourses([...courses, newCourse ]);
  // };
  // const deleteCourse = (courseId: string) => {
  //   setCourses(courses.filter((course) => course._id !== courseId));
  // };
  // const updateCourse = () => {
  //   setCourses(
  //     courses.map((c) => {
  //       if (c._id === course._id) {
  //         return course;
  //       } else {
  //         return c;
  //       }
  //     })
  //   );
  // };
  
  // const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const { enrollments } = db;
  
  const [allCourses, setAllCourses] = useState<any>(courseClient.fetchAllCourses())
  const [displayEnrollmentOptions, setDisplayEnrollmentOptions] = useState<boolean>(false);
  
  const enrollStudent = async (userID : string, courseID : string) => {
    console.log("test1")
    await courseClient.enrollUserInCourse(userID, courseID)
    console.log("test2")
    updateCourses()
  }
  
  const unenrollStudent = async (userID : string, courseID : string) => {
    await courseClient.unenrollUserInCourse(userID, courseID)
    updateCourses()
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      
      <p>role : {role}</p>
      <div>
        <h5>
          { (role === "STUDENT") && 
            <button 
              className="btn btn-primary" id="wd-add-new-course-click" 
              onClick={async () => { 
                setAllCourses(await courseClient.fetchAllCourses()); 
                setDisplayEnrollmentOptions(!displayEnrollmentOptions); 
                console.log(displayEnrollmentOptions) }}>
              Enrollments 
            </button> }
        </h5>
        
        <div>
          {displayEnrollmentOptions && Array.from(allCourses).map((course : any) => (
            <div>
              <span className="fs-3 my-4">{course.name}</span>
              
              {
                courses.some(x => x._id === course._id) ? 
                <span>
                {/* hacky, fix */}
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
              <span>
                
              </span>
              
            </div>
            
          ))}
        </div>
        
      </div>
      
      <hr />
      
      <h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={addNewCourse} > Add </button>
          <button className="btn btn-warning float-end me-2"
                onClick={updateCourse} id="wd-update-course-click">
          Update
        </button>
      </h5><br />
      <input    value={course.name} className="form-control mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <textarea value={course.description} className="form-control" onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
      
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
                      {course.name}
                    </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description}
                    </p>
                    <button className="btn btn-primary"> Go </button>
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
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end" >
                      Edit
                    </button>
                    
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
