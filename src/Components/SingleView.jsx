import axios from 'axios';
import React, { useEffect, useState, Component } from "react";


class Overview extends Component {
    constructor() {
    super();
    this.state = {
    memes:[],
    memeIndex:0
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
    this.setState({ memes: data });
    console.log("memes received");
    console.log(data);
})
.catch(() => {
    console.log("error");
});
};

//NaN error?? warum ist memeIndex keine Nummer???
skipMeme = (memeIndex) => {
    memeIndex = memeIndex +1;
    console.log(memeIndex)
}

displayMeme = (memes, memeIndex) =>{
    if (!memes.length) return null;

    const meme = memes [0];

    return(
        <div>
       <h3>{meme.title} </h3> 
       <h2>{meme.comments}</h2> 
       <img src={meme.url} />
        </div>

    );

};




    render(){
     
        
        return(
            <div>
            <div>
                <h3> Single Memes</h3>
            </div>

            <div>
            {this.displayMeme(this.state.memes)} 
            </div>
            
            <div>
            <button onClick ={ () => this.skipMeme()} > Skip </button> 
            </div>

            </div>

           
        )
    }
}
export default Overview;