
import Modules from "../Modules";
import CourseStatus from "./Status";

function Home() {
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill">
        <Modules />
      </div>
      <div className="d-none d-md-block mx-4">
        <CourseStatus />
      </div>
    </div>
  );
}

export default Home
