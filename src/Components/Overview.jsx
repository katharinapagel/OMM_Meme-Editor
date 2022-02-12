
import axios from 'axios';
import React, { useEffect, useState, Component } from "react";

class Overview extends Component {
    constructor() {
        super();
        this.state = {
        memes:[]
        };
    }

componentDidMount = () =>{
    this.getMemes();
};

//get memes from database
 getMemes =() =>{
    axios.get("http://localhost:5000/api/meme/getMeme")
    .then((response) => {
        const data = response.data;
        console.log("memes received");
        console.log(data);
    })
    .catch(() => {
        console.log("error");
    });
};

displayMemes = (memes) =>{
    if (!memes.length) return null;

    return memes.map((displayMemes, index) => (
        <div>
        key={index},
       <h3>{memes.title} </h3> 
       <img src={memes.url} />
        </div>

    ));

};

render (){
return (
    <div>
        <div>
        <h1>Look at all the memes! </h1>
       </div>

    <div>
    {this.displayMemes(this.state.memes)} 
    </div>
    <div>
       
    </div>
    </div>


    );
}
}


export default Overview;