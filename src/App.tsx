import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import github from './static/icons8-github-25.png'
import Header from './components/header';
import Editor from './components/editor';
import Chatbox from './components/chatbox';

const App: React.FC = () => {
    return (
        <Container fluid>
            <Row id="header">
                <Header />
            </Row>
            <Row id="content">
                <Col id="content-editor">
                    <Editor />
                </Col>
                <Col id="content-chatbox">
                    <Chatbox />
                </Col>
            </Row>
        </Container>
    ) 
}

export default App;