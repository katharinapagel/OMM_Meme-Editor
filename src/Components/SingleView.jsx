import axios from 'axios';
import React, { Component } from "react";

const speechSynthesis = window.speechSynthesis;
const voices = speechSynthesis.getVoices();

//source: https://www.youtube.com/watch?v=Mfp94RjugWQ
class SingleView extends Component {
    constructor() {
    super();
    this.state = {
        memes:[],
        memeIndex:0,
        voiceIndex: -1,
        voice: null
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
}
previousMeme = () => {
    this.state.memeIndex = this.state.memeIndex -1;
    if (this.state.memeIndex < 0) {
        this.state.memeIndex = this.state.memes.length -1;
    }
    this.displayMeme();
}

 // https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
 speak = (text) => {
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[this.voiceIndex];
    speechSynthesis.speak (utterance);
}

displayMeme = () =>{
    if (!this.state.memes.length) return null;
    const meme = this.state.memes [this.state.memeIndex];

    document.getElementById("memeContainer").innerHTML = 
        `<div> <h4><b> Title: ${meme.title} </b> <button id="playButton" ><span role="img">🎤</span></button> <label> <i>click me to play title</i> </label></h4> <h5>${meme.comments}</h5> <img src=${meme.url} /> </div>`   
        var button = document.getElementById("playButton");
        button.addEventListener("click", () => {this.speak ("The title of the meme is " + meme.title);});
};

    render(){
        return(
            <div>
                <label htmlFor="voice">Voice</label>
                    <select
                        id="voice"
                        name="voice"
                        value={this.voiceIndex}
                        onChange={(event) => {
                            this.voiceIndex = (event.target.value);
                        }}
                        >
                        <option value="">Default</option>
                        {voices.map((option, index) => (
                            <option key={option.voiceURI} value={index}>
                            {`${option.lang} - ${option.name}`}
                            </option>
                        ))}
                    </select>
                <div> <h3> Single Memes </h3> </div>
                <div id="memeContainer"> {this.displayMeme()} </div>
                <p></p>
                <div> <button style = {{width: 100, height:40, backgroundColor: "lightblue"}} onClick ={ () => this.previousMeme()} > Previous </button><button style = {{marginLeft: 50, width: 100, height:40, backgroundColor: "lightblue"}} onClick ={ () => this.skipMeme()} > Next </button> </div>
            </div>
        )
    }
}
export default SingleView;