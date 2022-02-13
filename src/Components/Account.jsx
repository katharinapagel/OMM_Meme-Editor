import axios from 'axios';
import React, { useState } from "react";

function Account(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const config = {
        headers: {
            "Content-type":"application/json",
            "auth-token":localStorage.getItem("token")
        }
    }

    axios.post('http://localhost:5000/api/user/userData', {
        email: localStorage.getItem("email")
        }, config
    ).then (response => {
        setName(response.data.name); 
        setEmail(response.data.email);
    });

    return <div> 
        <h1>Your account details:</h1>
        <p></p>
        <h4><u><b>name:</b></u>&emsp;&emsp;{name}</h4>
        <h4><u><b>email address:</b></u>&emsp;&emsp;{email}</h4>
    </div>
}

export default Account;