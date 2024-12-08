
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
  
  // A6 5.3.2
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      console.log("GOT COURSES FOR USER - " + JSON.stringify(courses))
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
      // is this necessary? not working ao 1:13 12/8
      // const courses = allCourses.map((course: any) => {
      //   if (enrolledCourses.find((c: any) => c._id === course._id)) {
      //     return { ...course, enrolled: true };
      //   } else {
      //     return course;
      //   }
      // });
      const courses = enrolling ? allCourses : enrolledCourses
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
 };

  
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const fetchAllCourses = async () => {
    try {
      const courses = await courseClient.fetchAllCourses();
      setCourses(courses);
    } catch (error) {
      console.log("ERROR fetching courses")
      console.error(error);
    }
  };
  
  useEffect(() => { 
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
 
    // fetchAllCourses(); 
    }, 
    [currentUser]
  );
  
  
  const [editingCourse, setEditingCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });
  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(editingCourse);
    setCourses([...courses, newCourse ]);
  };
  const deleteCourse = async (courseId: any) => {
    await courseClient.deleteCourse(courseId); // const status = 
    setCourses(courses.filter((course) => course._id !== courseId));
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
  };
  
  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
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
                    updateCourses={fetchAllCourses}
                    enrolling={enrolling} setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
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
