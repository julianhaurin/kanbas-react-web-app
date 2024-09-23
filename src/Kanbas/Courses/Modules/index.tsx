
function Modules() {
  return (
    <div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      
      <button id="wd-module-button" type="button">Collapse All</button>
      <button id="wd-module-button" type="button">View Progress</button>
      <select id="wd-select-one-genre">
         <option selected value="PUBLISH_ALL">Publish All</option>
         <option value="MODULE_1">Module 1</option>
         <option value="MODULE_2">Module 2</option>
      </select>
      <button id="wd-module-button" type="button">+ Module</button>
      
      <ul id="wd-modules">
      
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
          
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
            
            <li className="wd-reading">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Developer - Chapter 1</li>
                <li className="wd-content-item">Full Stack Developer - Chapter 2</li>
              </ul>
            </li>
            
            <li className="wd-slide">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Intro to Web Dev</li>
                <li className="wd-content-item">Formatting Web Content</li>
              </ul>
            </li>
            
          </ul>
        </li>

        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
            </li>
          </ul>
        </li>
        
      </ul>
    </div>
);}

export default Modules
