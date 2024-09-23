
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      
      <div id="wd-dashboard-courses">
      
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/Dashboard/testImage.jpeg" width={200} />
            <div>
              <h5>
                 CS1234 React JS
              </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1235/Home">
            <img src="/images/Dashboard/testImage.jpeg" width={200} />
            <div>
              <h5>
                 CS1235
              </h5>
              <p className="wd-dashboard-course-title">
                Description
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1236/Home">
            <img src="/images/Dashboard/testImage.jpeg" width={200} />
            <div>
              <h5>
                 CS1236
              </h5>
              <p className="wd-dashboard-course-title">
                Description
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1237/Home">
            <img src="/images/Dashboard/testImage.jpeg" width={200} />
            <div>
              <h5>
                 CS1237
              </h5>
              <p className="wd-dashboard-course-title">
                Description
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1238/Home">
            <img src="/images/Dashboard/testImage.jpeg" width={200} />
            <div>
              <h5>
                 CS1238
              </h5>
              <p className="wd-dashboard-course-title">
                Description
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1239/Home">
            <img src="/images/Dashboard/testImage.jpeg" width={200} />
            <div>
              <h5>
                 CS1239
              </h5>
              <p className="wd-dashboard-course-title">
                Description
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1240/Home">
            <img src="/images/Dashboard/testImage.jpeg" width={200} />
            <div>
              <h5>
                 CS1240
              </h5>
              <p className="wd-dashboard-course-title">
                Description
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1241/Home">
            <img src="/images/Dashboard/testImage.jpeg" width={200} />
            <div>
              <h5>
                 CS1241
              </h5>
              <p className="wd-dashboard-course-title">
                Description
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard
