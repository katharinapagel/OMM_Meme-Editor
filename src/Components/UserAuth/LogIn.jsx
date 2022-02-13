import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col}  from 'react-bootstrap';
import {Link} from "react-router-dom";
import {useState} from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


//Login functionality: Checks whether the data in the Login form matches the user data stored in the database
//Source: https://www.youtube.com/watch?v=iw5RSIflYGU&t=3489s

const LogIn = () => {

const [email, setEmail] = useState("")
const [password, setPassword] = useState ("")
const [error, setError] = useState(false);
const navigate = useNavigate();


const submitHandler = async (e) => {
    e.preventDefault()
    
    try{

        const config = {
            headers: {
                "Content-type":"application/json"
            }
        }
            const{data} = await axios.post('http://localhost:5000/api/user/login',
            {
            email,
            password,
            },
            config
        );
        /*Part of protected routing: Users can only access the editor, orverview and single view, when they are logged in and have an valid token*/
        if (data != null) {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("email", email);
            localStorage.setItem("token", data);
            navigate(`/Editor`);
        }
        else{localStorage.setItem("isAuthenticated", "false")};
        
    }catch (error) {
        setError(error.response.data.message);
    }
}

    //login form
    return(
        <div>
          <Container>
              <h1>LOG IN</h1>
           <Form onSubmit = {submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                    type="email"
                    value = {email}
                    placeholder="Please enter your Email"
                    onChange = {(e) =>setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    value={password}
                    placeholder="Please enter your Password"
                    onChange = {(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                New User? <Link className="Buttonlink" to="/register">Sign Up here</Link>
                </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LogIn