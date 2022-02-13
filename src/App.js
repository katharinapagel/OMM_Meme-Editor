import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Navbar from './Components/Navbar';
import Editor from "./Components/Editor/Editor";
import Overview from "./Components/Overview";
import Account from "./Components/Account";
import LandingPage from './Components/LandingPage';
import LogIn from './Components/UserAuth/LogIn';
import Registration from './Components/UserAuth/Registration';
import CreatedMemeCopy from './Components/CreatedMemeClipboard';
import SingleView from "./Components/SingleView";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (

    <Router>
      <Navbar />

      <Routes>
      
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<Registration />} />
      
      {/*protected routes */}
      <Route path="/overview" element={<RequireAuth redirectTo="/"><Overview /></RequireAuth>} />
      <Route path="/editor" element={<RequireAuth redirectTo="/"><Editor /></RequireAuth>} />
      <Route path="/account" element={<RequireAuth redirectTo="/"><Account /></RequireAuth>} />
      <Route path="/singleView" element={<RequireAuth redirectTo="/"><SingleView /></RequireAuth>} />
      <Route path="/memeCreatedCopy" element={<CreatedMemeCopy />} />

      </Routes>

      <Routes>
       <Route path='/generated' element= {<CreatedMemeCopy/>} />
      </Routes>
      
    </Router>

    
  )
  
}

function RequireAuth ({children, redirectTo}) {
  let isAuthenticated = localStorage.getItem("isAuthenticated")
;
return isAuthenticated ? children : <Navigate to={redirectTo} />;

}

export default App;
