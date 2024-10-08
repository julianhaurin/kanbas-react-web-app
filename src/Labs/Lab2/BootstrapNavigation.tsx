
function BootstrapNavigation() {
  return(
    <div>
      <div id="wd-css-navigating-with-tabs">
        <h2>Tabs</h2>
        <ul className="nav nav-tabs">
          <li className="nav-item">
              <button className="nav-link active">Active</button>
          </li>
          <li className="nav-item">
              <button className="nav-link">Link</button>
          </li>
          <li className="nav-item">
              <button className="nav-link">Link</button>
          </li>
          <li className="nav-item">
              <button className="nav-link disabled">Disabled</button>
          </li>
        </ul>
      </div>
      
      <div id="wd-css-navigating-with-cards">
        <h2>
          Cards
        </h2>
        <div className="card"
          style={{ width: "18rem" }}>
          <img src="images/stacked.jpg" alt=""
            className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">
              Title
            </h5>
            <p className="card-text">
              Description
            </p>
            <button className="btn btn-primary">
              Btn
            </button>
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default BootstrapNavigation
