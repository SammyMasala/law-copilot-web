import React, { useEffect, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Quill from "./components/quill";
import ChatBox from "./components/chatbox";
import Header from "./components/header";
import Footer from "./components/footer";

const App: React.FC = () => {
    const defautContentStyle = { height: "1000px" }
    const [text, setText] = useState<string>("")
    const [contentStyle, setContentStyle] = useState<{height: string}>(defautContentStyle) 

    useEffect(() => {
        const elem = document.getElementById('content')
        elem!.style.height = `${elem!.offsetHeight.toString()}px`
    }, [contentStyle]);

    return(
        <Container fluid id="root-container" className="d-flex flex-column vh-100">
            <Row id="header" className="flex-shrink-0">
                <Col>
                    <Header />
                </Col>
            </Row>
            <Row id="content" className="flex-grow-1" style={contentStyle}>
                <Col xs={8} id="editor" className="border h-100 p-1">
                    <Quill updateInput={setText}/>
                </Col>
                <Col xs={4} id="chatbox" className="border h-100 p-1">
                    <ChatBox />
                </Col>
            </Row>
            <Row className="flex-shrink-0">
                <Col>
                </Col>
            </Row>
        </Container>
    )
}

export default App