import React from "react";
import { useLocation } from 'react-router-dom';

function Overview(){
    const location = useLocation();
    const url = new URLSearchParams(location.search).get('url');
    
    return <div>
        <h1>render all memes from the mongodb collection here </h1>
    </div>
    
}

export default Overview;