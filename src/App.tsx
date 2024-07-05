import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import github from './static/icons8-github-25.png'
import Header from './components/header';
import Editor from './components/editor';
import Chatbox, { IMessage } from './components/chatbox';

const App: React.FC = () => {
    const [document, setDocument] = useState<string>("")
    const [messages, setMessages] = useState<IMessage[]>([])

    return (
        <Container className='bg-dark-subtle d-flex flex-column vh-100' fluid>
            <Row className="bg-dark text-light flex-shrink-0" id="header">
                <Header />
            </Row>
            <Row className="flex-grow-1" id="content">
                <Col xs={12} md={8} className="d-flex" id="content-editor">
                    <Editor onChange={setDocument}/>
                </Col>
                <Col xs={0} md={4} className="d-flex" id="content-chatbox">
                    <Chatbox onChange={setMessages}/>
                </Col>
            </Row>
        </Container>
    ) 
}

export default App;