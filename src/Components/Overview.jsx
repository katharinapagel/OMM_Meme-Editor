import React from "react";
import { useLocation } from 'react-router-dom';

function Overview(){
    const location = useLocation();
    const url = new URLSearchParams(location.search).get('url');

    return <div>
        <h1> Great Job! Look at that meme!</h1>
        
        <div>
        { url && <img alt='meme' src={url} /> }
        </div>
       
    </div>
    
}

export default Overview;