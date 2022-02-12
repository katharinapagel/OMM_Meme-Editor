//Editor where user can edit memes
//Uses imgflip api to fetch memes - https://imgflip.com/api

import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import "./Editor.css";
import axios from 'axios';
import {setState} from "react";

function Editor (){
   
    const [memes, setMemes] = useState([]);
    const [memeIndex, setMemeIndex] = useState(0); //index for skipping through memes, to be used with skip button
    const [captions, setCaptions]= useState ([]); //arry of strings -> captions for each meme
    //insert shuffle memes function here to start with a random meme when page is refreshed (https://www.youtube.com/watch?v=SMzAcBEc6Zk&t=9s min 21)
    const navigate = useNavigate();

    // Meme schema 
    const [url, setUrl] =useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [upvotes, setUpvotes]= useState();
    const [downvotes, setDownvotes] = useState();
    const [comments, setComments]= useState ();



                
    const updateCaption = (e, index) => {
        const text = e.target.value || ''; //text that user enters
        setCaptions(
          captions.map((c, i) => {
            if(index === i) {
              return text;
            } else {
              return c;
            }
          })
        );
        };

    //generate Meme
    const generateMeme = () => {
        const currentMeme = memes[memeIndex];
        const formData = new FormData ();   //imgflip API accepts formData objects

        formData.append("username", "AnnaHartmeyer"); //imgflip account
        formData.append("password", "OMMGirls123");   //imgflip account
        formData.append("template_id", currentMeme.id);
        captions.forEach((c,index) => formData.append(`boxes[${index}][text]`, c)); //body for formData

        //Request to server

        fetch("https://api.imgflip.com/caption_image", {

            method:"POST",
            body: formData

        }).then(res => {
            res.json().then (res => { //json is asychronis
              setUrl(res.data.url);
              console.log(res.data.url);
              
             
            }

            )
        }
        )
        
    };

   const saveMeme = () => {
    axios.post('http://localhost:5000/api/meme/postMeme',
    {
    url,
    title,
    description,
    upvotes,
    downvotes,
    comments,
    }
    );

    navigate(`/generated?url=${url}`); //here path to createdMeme view

   }

    

    //Fetch meme from API, imgflip website
    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes").then (res =>{ 
        res.json().then(res => {
            const memes = res.data.memes; //output from API
            setMemes(memes);
        });
        });
    },[]);

    //check how many captions a meme has (box_count), needs to be updated when meme changes 
    
    useEffect(() => {
        if(memes.length) {
          setCaptions(Array(memes[memeIndex].box_count).fill(''));
        }
      }, [memeIndex, memes]);

    //funtion for clear button refreshes the page wich clears the text, source: https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react
     const refreshPage = () =>{
        window.location.reload(false);
      }

    const randomNumber =() => {
      const randomNumber = Math.floor(
        Math.random() * memes.length
      )
      return randomNumber;
    }

    return (
    memes.length ? //check if meme is avaiable, button to choose meme
  
    <div> 
      <div>
        <button onClick ={generateMeme} className= {Editor.generate}> Generate </button> 
        <button onClick = {saveMeme} > Save </button>
        <button onClick ={ () => setMemeIndex(memeIndex +1)} className= {Editor.skip}> Skip </button> 
        <button onClick = {() => setMemeIndex (randomNumber)}> Random </button>
        {
            captions.map((c,index)=> (
                <input type="text" onChange= {(e) =>updateCaption (e,index)} key={index} /> //onChange is called whenever user types in text in the input box

            ))

          }
        
        <button onClick = {refreshPage} className={Editor.skip}> Clear Text </button>
        <img src= {memes[memeIndex].url} />
        
        </div>

        <div>
          <input type="text" onChange =  {(e) => setTitle (e.target.value) } />   
        </div> 

    
    </div>
  

    : <></> 
    
    
    );

      };

    export default Editor;