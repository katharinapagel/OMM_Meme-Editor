import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './Components/Navbar';
import Overview from "./Components/Overview";
import Account from "./Components/Account";
import LandingPage from './Components/LandingPage';
import Editor from './Components/Editor';
import CreatedMemeCopy from './Components/CreatedMemeClipboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (

    <Router>
      <Navbar />

      <Routes>
      
      <Route path="/" element={<LandingPage />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/account" element={<Account />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/memeCreatedCopy" element={<CreatedMemeCopy />} />
      
     
      </Routes>

      <Routes>
        <Route exact path='/' element ={<Editor/>} />
       
       <Route path='/generated' element= {<CreatedMemeCopy/>} />

      </Routes>

    </Router>

    
  )
  
}

export default App;
