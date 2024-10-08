
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

// TODO:
// make sure side navbar updates when sections are selectd
// dont let course cards become super narrow (?) 4.2?
// Finish modules controls 4.4
// bsplus has addotional class name 4.4 originally in module index.tsx
// home page status icons 4.5
// some module icons needs to be black (currently white)
// name / section to landing page?
// align-self-center ***

