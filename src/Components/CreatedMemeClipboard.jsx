//this page shows the meme after it is created 

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./CreatedMemeClipboard.css";
//import { useClipboard } from 'use-clipboard-copy'; //funktioniert hier aktuell nicht - "kann Modul nicht finden?"

function CreatedMemeCopy(){
    const location = useLocation();
    const url = new URLSearchParams(location.search).get('url');
    // const clipboard = useClipboard();
    // const [copied, setCopied] = useState(false);


    // const copyLink = () => {
    //     clipboard.copy(url);
    //     setCopied(true);
    //   };

    return <div className="">
        <h1> Great Job!</h1>
        
        <div>
            {/* <div>
            <button onClick={copyLink} className="">
        {copied ? 'Link copied!' : 'Copy link'}
        </button>
            </div> */}
        { url && <img alt='meme' src={url} /> }
        </div>
       
    </div>
    
}

export default CreatedMemeCopy;