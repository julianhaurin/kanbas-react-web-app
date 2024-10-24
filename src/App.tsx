
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Labs from "./Labs";
import Kanbas from "./Kanbas"

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Labs" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
    </HashRouter>
);}


export default App

// todo:
// update courses images
// modules page
// home page
// assignments screen (on own)
// assignments editor screen (on own)
// account screen (end)
// deploy main and change branches netlify
// github link 2.12
// go over everything
// 
