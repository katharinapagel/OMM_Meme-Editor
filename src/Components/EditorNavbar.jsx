import React from "react";
import "./EditorNavbar.css";
import Editor from "./Editor";

import { useNavigate } from "react-router-dom";


function EditorNavbar() {
    let navigate = useNavigate();
    function handleClick() {
        navigate('./editor')
    }
    return (
        <div>
           <button onClick= { handleClick }>Choose template</button> 
           <button>Upload template</button>
           <button>Upload from URL</button>
           <button>Take photo</button>
           <button>Draw template</button>
    
        
        </div>
    );

}

export default EditorNavbar;