import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col}  from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

//Sign Up functionality: Data from the registration form are stored in the database
//Source: https://www.youtube.com/watch?v=iw5RSIflYGU&t=3489s
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault()

        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                },

            };
            const {data} = await axios.post(
                "http://localhost:5000/api/user/register",
                {name, email,password},
                config
            );
            /*Part of protected routing: Users can only access the editor, orverview and single view, when they are logged in and have an valid token*/
            if (data != null) {
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("email", email);
                localStorage.setItem("token", data);
                navigate(`/Editor`);
            }
            else{localStorage.setItem("isAuthenticated", "false");};
        }catch (error) {
            setError(error.response.data.message);
        }

    }

    //sign up form
    return (
        <div>
            <Container>
            <h1>SIGN UP</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type="name"
                        value={name}
                        placeholder="Please enter your Name"
                        onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                        type="email"
                        value={email}
                        placeholder="Please enter your Email"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        value={password}
                        placeholder="Please enter your Password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
                <Row className="py-3">
                <Col>
                You already have an account? <Link className="Buttonlink" to="/login">Login here</Link>
                </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SignUp