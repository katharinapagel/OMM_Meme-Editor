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
skipMeme = () => {
    this.state.memeIndex = this.state.memeIndex +1;
    if (this.state.memeIndex >= this.state.memes.length) {
        this.state.memeIndex = 0;
    }
    this.displayMeme();
    console.log(this.state.memeIndex)
}
previousMeme = () => {
    this.state.memeIndex = this.state.memeIndex -1;
    if (this.state.memeIndex < 0) {
        this.state.memeIndex = this.state.memes.length -1;
    }
    this.displayMeme();
    console.log(this.state.memeIndex)
}

displayMeme = () =>{
    if (!this.state.memes.length) return null;
    const meme = this.state.memes [this.state.memeIndex];

    document.getElementById("memeContainer").innerHTML = 
    `<div> <h3>${meme.title} </h3> <h2>${meme.comments}</h2> <img src=${meme.url} /> </div>`
};

    render(){
        return(
            <div>
                <div> <h3> Single Memes</h3> </div>
                <div id="memeContainer"> {this.displayMeme()} </div>
                <div> <button onClick ={ () => this.skipMeme()} > Next </button> </div>
                <div> <button onClick ={ () => this.previousMeme()} > Previous </button> </div>
            </div>
        )
    }
}
export default Overview;