import React from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import "./styles.css";

export default () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar style={{backgroundColor: "#0F2151"}} variant="dark">
                <Container>
                    <Navbar.Brand href="/">Maverick4</Navbar.Brand>
                </Container>
            </Navbar>
            <div className="Landing">
                <Container style={{textAlign: "center", maxWidth: 400}}>
                    <img width={100} src="https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/512/Calculator_512.png"/>
                    <h1 style={{marginTop: 30}}>Hybrid Calculator 1.0</h1>
                    <p>Compute arithmetic, trigonometric functions, logarithmic functions, calculus and more! Get started below</p>
                    <Button onClick={(e) => {
                        navigate("/layout");
                    }} style={{marginTop: 10, width: 150, fontWeight: "bold"}} variant="primary">Go to App</Button>
                    <br/>
                    <img width={100} style={{marginTop: 30}} src="https://images.squarespace-cdn.com/content/v1/5f040b5c2da53a4ed0d94956/5effadaa-9f41-4266-ada1-e5fd56903d43/YEC+Logo+%28Ombre%29.png"/>
                </Container>
            </div>
        </>
    );
}