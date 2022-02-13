import axios from 'axios';
import React, { useEffect, useState, Component } from "react";
import {useSpeechSynthesis} from 'react-speech-kit';

//source: https://www.youtube.com/watch?v=Mfp94RjugWQ
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
        this.setState({ memes: data });
        console.log("memes received");
        console.log(data);
    })
    .catch(() => {
        console.log("error");
    });
};


 displayMemes = (memes) =>{
    if (!memes.length) return null;

    return memes.map((memes, index) => (
        <div key={index}>
            <h3><b>{memes.title}</b>
                 <button on Click={() => this.setState({})}><span role="img">🎤</span></button> 
                 <label> <i>click me to play title</i> </label>
            </h3> 
            <h4>{memes.comments}</h4> 
            <img src={memes.url} />
        </div>

    ));

};

render (){
return (
    <div>
        <div> <h1> <b>Look at all the memes!</b> </h1> </div>
        <div> {this.displayMemes(this.state.memes)} </div>
    </div>
    );
}
}
export default Overview;