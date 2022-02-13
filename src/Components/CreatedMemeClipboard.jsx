//this page shows the meme after it is created 

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./CreatedMemeClipboard.css";

//this function uses URLSearchParams to search for the URL of the just created meme and displays it as an image
function CreatedMemeCopy(){
    const location = useLocation();
    const url = new URLSearchParams(location.search).get('url');
    

    return <div className="">
        <h1> Great Job! </h1>
        <h3> You've created this awesome Meme: </h3>
        <p></p>
        <div>

        { url && <img alt='meme' src={url} /> }
        </div>
       
    </div>
    
}

export default CreatedMemeCopy;