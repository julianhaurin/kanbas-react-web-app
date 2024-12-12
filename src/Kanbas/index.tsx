
import { Routes, Route, Navigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./styles.css";

import KanbasNavigation from "./Navigation";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";

import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
// import * as db from "./Database";
// import * as client from "./Courses/client";

import { useState } from "react";

import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";

function Kanbas() {
  
  // DASHBOARD COURSES
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const findCoursesForUser = async () => {
    try {
      if (!currentUser) { currentUser = await userClient.getCurrentUserData() }
      const courses = await userClient.findCoursesForUser(currentUser._id);
      return courses;
    } catch (error) {
      console.error(error);
    }
    return null
  };
  const fetchAllCourses = async () => {
    try {
      const courses = await courseClient.fetchAllCourses();
      return courses;
    } catch (error) {
      console.error(error);
    }
    return courses;
  };
  
  const fetchCourses = async () => {
    try {
      const allCourses = await fetchAllCourses();
      const enrolledCourses = await findCoursesForUser();
      const courses = enrolling ? allCourses : enrolledCourses
      setCourses(courses);
      setUserCourses(enrolledCourses)
    } catch (error) {
      console.error(error);
    }
 };

  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  let { currentUser } = useSelector((state: any) => state.accountReducer);
  
  useEffect(() => { 
      fetchCourses()
    }, 
    [currentUser, enrolling]
  );
  
  // COURSES EDITING 
  const [editingCourse, setEditingCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });
  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(editingCourse);
    setCourses([...courses, newCourse ]);
    setUserCourses(await findCoursesForUser())
  };
  const deleteCourse = async (courseId: any) => {
    await courseClient.deleteCourse(courseId); // const status = 
    setCourses(courses.filter((course) => course._id !== courseId));
    setUserCourses(await findCoursesForUser())
  };
  const updateCourse = async () => {
    await courseClient.updateCourse(editingCourse);
    setCourses(
      courses.map((c) => {
        if (c._id === editingCourse._id) {
          return editingCourse;
        } else {
          return c;
        }
      })
    );
    setUserCourses(await findCoursesForUser())
    
  };
  
  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    console.log("updating enrollment: " + enrolled + " : " + courseId)
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    fetchCourses()
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
    setUserCourses(await findCoursesForUser())
  };
 
  
  return (
    <Session>
      <div id="wd-kanbas">
        <a href="https://github.com/julianhaurin/kanbas-react-web-app">Github Link</a>
        <br/>
        <br/>
        <div>
          <KanbasNavigation />
          <div className="wd-main-content-offset p-3">
            <Routes>
              <Route path="/" element={<Navigate to="Account" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route path="/Dashboard" element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    editingCourse={editingCourse}
                    setEditingCourse={setEditingCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    updateUserCourses={fetchCourses}
                    enrolling={enrolling} setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
                    userCourses={userCourses}
                  />
                </ProtectedRoute>}/>
              <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute> } />
              <Route path="/Calendar" element={<h1>Calendar</h1>} />
              <Route path="/Inbox" element={<h1>Inbox</h1>} />
            </Routes>
          </div>
        </div>
      </div>
    </Session>
);}

export default Kanbas
