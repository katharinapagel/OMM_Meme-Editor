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

displayMeme = (memes) =>{
    if (!memes.length) return null;

    return memes.map((memes, index) => (
        <div key={index}>
       <h3>{memes.title} </h3> 
       <h2>{memes.comments}</h2> 
       <img src={memes.url} />
        </div>

    ));

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
            <button onClick ={ () => (this.memeIndex +1)} > Skip </button> 
            </div>

            </div>

           
        )
    }
}
export default Overview;