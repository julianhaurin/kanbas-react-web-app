
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-4 row-cols-md-3 g-4 no-wrap">
        
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/1234/Home">
                <img alt="" src="/images/Dashboard/course1.jpg" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1234 React JS
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Fall 2024 SEC 01
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/1235/Home">
                <img alt="" src="/images/Dashboard/course2.avif"  width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1235
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Fall 2024 SEC 01
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/1236/Home">
                <img alt="" src="/images/Dashboard/course3.jpg"  width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1236
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Fall 2024 SEC 01
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/1237/Home">
                <img alt="" src="/images/Dashboard/course4.jpg"  width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1237
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Fall 2024 SEC 01
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/1238/Home">
                <img alt="" src="/images/Dashboard/course5.jpg"  width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1238
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Fall 2024 SEC 01
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/1239/Home">
                <img alt="" src="/images/Dashboard/course6.jpg"  width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1239
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Fall 2024 SEC 01
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/1240/Home">
                <img alt="" src="/images/Dashboard/course7.jpg"  width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1240
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Fall 2024 SEC 01
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark  "
                    to="/Kanbas/Courses/1241/Home">
                <img alt="" src="/images/Dashboard/course8.jpg"  width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1241
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Fall 2024 SEC 01
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard
