import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './Components/Navbar';
import Editor from "./Components/Editor/Editor";
import Overview from "./Components/Overview";
import Account from "./Components/Account";
import LandingPage from './Components/LandingPage';
import ChooseTemplate from './Components/Editor/ChooseTemplate';
import LogIn from './Components/UserAuth/LogIn';
import Registration from './Components/UserAuth/Registration';

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
      <Route path="/overview" element={<Overview />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/account" element={<Account />} />
      <Route path="editor/choosetemplate" element={<ChooseTemplate />} />




      </Routes>
    </Router>

    
  )
  
}

export default App;
