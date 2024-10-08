
function BootstrapNavigation() {
  return(
    <div>
      <div id="wd-css-navigating-with-tabs">
        <h2>Tabs</h2>
        <ul className="nav nav-tabs">
          <li className="nav-item">
              <a className="nav-link active">Active</a>
          </li>
          <li className="nav-item">
              <a className="nav-link">Link</a>
          </li>
          <li className="nav-item">
              <a className="nav-link">Link</a>
          </li>
          <li className="nav-item">
              <a className="nav-link disabled">Disabled</a>
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
            <a className="btn btn-primary">
              Btn
            </a>
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default BootstrapNavigation
