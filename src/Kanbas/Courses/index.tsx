
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";

import CoursesNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";
import Quiz from "./Quizzes/Quiz";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/PeopleTable";

// import { courses } from "../Database";

import { FaAlignJustify } from "react-icons/fa";

function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const course = courses.find((course) => course._id === cid);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid" element={<QuizDetails />} />
            <Route path="Quizzes/:qid/Editor" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/Quiz" element={<Quiz />} />
            
            <Route path="test" element={<AssignmentEditor />} />
            
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            
            <Route path="People" element={<PeopleTable/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Courses

