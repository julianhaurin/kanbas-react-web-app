
import { Routes, Route, Navigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./styles.css";

import KanbasNavigation from "./Navigation";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";

// import * as db from "./Database";
import * as client from "./Courses/client";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";

import { useState } from "react";

import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";

function Kanbas() {
  
  const [courses, setCourses] = useState<any[]>([]);
  
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchCourses = async () => {
    // console.log("fetching courses")
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
    } catch (error) {
      console.log("ERROR fetching courses")
      console.error(error);
    }
  };
  
  useEffect(() => { fetchCourses(); }, [currentUser]);
  
  
  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });
  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([...courses, newCourse ]);
  };
  const deleteCourse = async (courseId: any) => {
    // const status = await courseClient.deleteCourse(courseId);
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
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
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
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
