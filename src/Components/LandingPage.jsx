import React from "react";
import Button from "react-bootstrap/Button";
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from "react-router-dom";


//Landing page where users can either sign up, when they do not have an account, or login when they already have an account
function LandingPage(){
    return <div>
        <Container>
            <Row>
                <h1>Welcome to Meme Generator!</h1>
            </Row>
            </Container>
            <Container>
            <Row>
                <Col><Button variant="primary" type="LogIn"><Link className="link" to="/register">Sign Up</Link></Button></Col> 
                <Col><Button variant="primary" type="LogIn"><Link className="link" to="/login">Log In</Link></Button></Col>
            </Row>
        </Container>
    </div>
}

export default LandingPage;