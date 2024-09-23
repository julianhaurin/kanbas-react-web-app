
function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h3><label htmlFor="wd-name">Assignment Name</label></h3>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of your 
        Web application running on Netlify. The landing page should include the following: Your
        full name and section Link to the Kanbasa application Link to all relevant source code
        repositories. The Kanbas application should include a link to navigate back to 
        the landing page. 
      </textarea>
      
      <br />
      
      <table>
      
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <br/>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </td>
        </tr>
        <br/>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="PERCENTAGE">PERCENTAGE</option>
              <option value="FRACTION">FRACTION</option>
              <option value="DECIMAL">DECIMAL</option>
            </select>
          </td>
        </tr>
        <br/>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="ONLINE">Online</option>
            </select>
          </td>
        </tr>
        
        <br/>
        
        Online Entry Options
        <tr>
          <td>
            <input type="checkbox" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br/>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br/>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Uploads</label><br/>
          </td>
        </tr>
        
        <br/>
        
        <tr>
          <td>
            <label htmlFor="wd-assign-to">Assign to</label>
          </td>
        </tr>
        <tr>
          <td>
            <input id="wd-assign-to" value="Everyone"></input>
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="wd-due-date">Due</label>
          </td>
        </tr>
        <tr>
          <td>
            <input type="date" id="wd-due-date"></input>
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="wd-available-from">Available from</label>
          </td>
          <td>
            <label htmlFor="wd-available-until">Until</label>
          </td>
        </tr>
        <tr>
          <td>
            <input type="date" id="wd-available-from"></input>
          </td>
          <td>
            <input type="date" id="wd-available-until"></input>
          </td>
        </tr>
        
      </table>
      
      <hr />
      
      <div style={{textAlign: 'right'}}>
        <button>Cancel</button>
        <button>Save</button>
      </div>
      
    </div>
);}

export default AssignmentEditor
