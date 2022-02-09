import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './Components/Navbar';
import Overview from "./Components/Overview";
import EditorNavbar from "./Components/EditorNavbar";
import SingleView from "./Components/SingleView";
import Account from "./Components/Account";
import MemeGenerator from './Components/EditorYGWYS';
import Editor from './Components/Editor';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (

    <Router>
      <Navbar />

      <Routes>
      
      <Route path="/" element={<Overview />} />
      <Route path="/singleview" element={<SingleView />} />
      <Route path="/editornavbar" element={<EditorNavbar />} />
      <Route path="/account" element={<Account />} />

      </Routes>

      <Routes>

        <Route exact path='/' element ={<Editor/>} />
        <Route path='/generated' element= {<SingleView />} />

      </Routes>   


    </Router>

    
  )
  
}

export default App;
