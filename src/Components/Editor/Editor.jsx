//Editor where user can edit memes
//Uses imgflip api to fetch memes - https://imgflip.com/api

import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import "./Editor.css";
import axios from 'axios';

import {setState} from "react";
import {useSpeechRecognition} from 'react-speech-kit'; 

// provide possible languages for speech input - https://github.com/MikeyParton/react-speech-kit/blob/master/examples/src/useSpeechRecognition.jsx 
const languageOptions = [
  { label: 'Deutsch', value: 'de-DE' },
  { label: 'English', value: 'en-AU' },
  { label: 'Français', value: 'fr-FR' },
  { label: 'Italiano', value: 'it-IT' },
];

// varibale to define which textbox to use when insterting speech-to-text
var textbox = -1;

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
    const [createdAt, setCreatedAt] =useState();

    const [disabledState, setDisabledState] = useState(true);

    // https://github.com/MikeyParton/react-speech-kit/blob/master/examples/src/useSpeechRecognition.jsx
    const [lang, setLang] = useState('en-AU');
    const [blocked, setBlocked] = useState(false);
    const changeLang = (event) => {
      setLang(event.target.value);
    };
    const {listen, listening, stop} = useSpeechRecognition({
      onResult:(result) => { 
        updateCaption (result, textbox);
      }
    })

    // toggling microphone activity
    const toggle = (index) => {
      if (blocked && index!=textbox){
        return;
      }
      textbox = index;
        if (blocked){
          stop(); 
          setBlocked (false);
          document.getElementById("recordLabel" + index).innerHTML = "click me to record text";
        } else {
          listen({lang});
          setBlocked (true);
          document.getElementById("recordLabel" + index).innerHTML = "click me to stop recording";
        } 
      }
                
    const updateCaption = (e, index) => {
        const text = e || ''; //text that user enters
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
              setDisabledState(false);
            }
            )
        }
        )
        
    };

   const saveMeme = () => {
      console.log("saveMeme");
      axios.post('http://localhost:5000/api/meme/postMeme',
      {
      url,
      title,
      description,
      upvotes,
      downvotes,
      comments,
      createdAt
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

    //funtion for clear button clears the text
     const clearAll = () =>{
        setDisabledState(true);
        setTitle("");
        for (let j=0; j<captions.length; j++){
          setCaptions(
            captions.map((c, i) => {
              if(j === i) {
                return "";
              } else {
                return "";
              }
            })
          );
        } 
      }

    const randomNumber =() => {
      const randomNumber = Math.floor(
        Math.random() * memes.length
      )
      return randomNumber;
    }

    return (
    memes.length ? //check if meme is avaiable, button to choose meme
      
    // source for div "languageSelector" - https://github.com/MikeyParton/react-speech-kit/blob/master/examples/src/useSpeechRecognition.jsx
    <div> 
      <div id="languageSelector">
        <label htmlFor="language">Language</label>
              <select
                form="speech-recognition-form"
                id="language"
                value={lang}
                onChange={changeLang}
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
      </div>
      <div>
        <button disabled = {!disabledState} onClick ={generateMeme} className= {Editor.generate}> Generate </button> 
        <button id = "saveButton" disabled = {disabledState} onClick = {saveMeme} > Save </button>
        <button disabled = {!disabledState} onClick ={ () => setMemeIndex(memeIndex +1)} className= {Editor.skip}> Skip </button> 
        <button disabled = {!disabledState} onClick = {() => setMemeIndex (randomNumber)}> Random </button>
        <p></p>
        </div> <div> <b>Set Title of Meme:</b> <input disabled = {!disabledState} value={title} type="text" onChange =  {(e) => setTitle (e.target.value) } /></div> 
        <p></p>
        {
            // onChange is called whenever user types in text in the input box
            captions.map((c,index)=> (
                <div key={"div_"+index}> <input disabled = {!disabledState} onChange= {(e) =>updateCaption (e.target.value,index)} key={index} 
                      value = {captions[index]} /> 
                      <button disabled = {!disabledState} onClick={ (e) => toggle(index)} key={"button_"+index}> <span role="img">🎤</span> </button>
                      <label> <i id={"recordLabel"+index}>click me to record text</i> </label>
                </div>
            )) 
        }
        {listening && <div> Go ahead I'm listening </div>}
        
        <div><button onClick = {clearAll} className={Editor.skip}> Clear Text </button></div>
        <img src= {memes[memeIndex].url} />
        
        
    </div>
    : <></> 
    );
      };
    export default Editor;