import axios from 'axios';
import React, { Component } from "react";

const speechSynthesis = window.speechSynthesis;
const voices = speechSynthesis.getVoices();

//source: https://www.youtube.com/watch?v=Mfp94RjugWQ
class Overview extends Component {
    constructor() {
        super();
        this.state = {
            memes:[],
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
            console.log("memes received");
            console.log(data);
        })
        .catch(() => {
            console.log("error");
        });
    };

    // https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
    speak = (text) => {
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voices[this.voiceIndex];
        speechSynthesis.speak (utterance);
    }

    displayMemes = (memes) =>{
        if (!memes.length) return null;

        return memes.map((memes, index) => (
            <div key={index}>
                <h4><b>Title: {memes.title}</b>
                    <button onClick = {()=> {this.speak ("The title of the meme is " + memes.title);}}><span role="img">🎤</span></button> 
                    <label> <i>click me to play title</i> </label>
                </h4> 
                <h5>Comment: {memes.comments}</h5> 
                <img src={memes.url} />
                <p> </p>
                <h1>---------------------------</h1>
                <p> </p>
            </div>
            

        ));

    };

    // source for label & select - https://github.com/MikeyParton/react-speech-kit/blob/master/examples/src/useSpeechSynthesis.jsx
    render (){
    return (
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
            <div> <h1> <b>Look at all the memes!</b> </h1> </div>
            <p></p>
            <div> {this.displayMemes(this.state.memes)} </div>
        </div>
        );
    }
}
export default Overview;