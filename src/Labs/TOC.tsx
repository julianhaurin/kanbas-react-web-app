
import { Link, useLocation } from "react-router-dom";

function TOC() {
  const { pathname } = useLocation();
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <Link to="/Labs" className="nav-link">Labs</Link>
      </li>
      <li 
        className="nav-item"><Link to="/Labs/Lab1" className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}>Lab 1</Link>
      </li>
      <li 
        className="nav-item"><Link to="/Labs/Lab2" className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}>Lab 2</Link>
      </li>
      <li 
        className="nav-item"><Link to="/Labs/Lab3" className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}>Lab 3</Link>
      </li>
      <li 
        className="nav-item"><Link to="/Labs/Lab4" className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`}>Lab 4</Link>
      </li>
      <li 
        className="nav-item"><Link to="/Labs/Lab5" className={`nav-link ${pathname.includes("Lab5") ? "active" : ""}`}>Lab 5</Link>
      </li>
      <li 
        className="nav-item"><Link to="/Kanbas" className="nav-link">Kanbas</Link>
      </li>
      <li className="nav-item">
        <Link id="wd-github" to="https://github.com/julianhaurin/kanbas-react-web-app" className="nav-link">
          My GitHub
        </Link>
      </li>
    </ul>
  );
}

export default TOC
