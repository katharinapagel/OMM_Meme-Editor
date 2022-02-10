import React from "react";
import "./Editor.css";
import {Link} from "react-router-dom";

import { useNavigate } from "react-router-dom";


function EditorNavbar() {
    let navigate = useNavigate();
    function handleClick() {
        navigate('./ChooseTemplate')
    }
    return (
        <div>
           <button onClick= { handleClick }><Link className="Buttonlink" to="/editor/choosetemplate">Choose template</Link></button> 
           <button>Upload template</button>
           <button>Upload from URL</button>
           <button>Take photo</button>
           <button>Draw template</button>
    
        
        </div>
    );

}

export default EditorNavbar;