import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Quill from "./components/quill";
import ChatBox from "./components/chatbox";
import Header from "./components/header";

import background from "./static/bg-image.jpg"; 

const App: React.FC = () => {
    const defaultContentStyle = { 
        height: "1000px",
    }
    const [contentStyle, setContentStyle] = useState<{height: string}>(defaultContentStyle)
    const [textToAppend, setTextToAppend] = useState<string>("")

    // TODO Load Prior Save (API)
    useEffect(() => {
    }, [])

    // Reset textToAppend
    useEffect(() => {
        if(textToAppend.trim()){
            setTextToAppend("")
        }
    }, [textToAppend])
    
    // Set editor height (enable overflow)
    useEffect(() => {
        const elem = document.getElementById("content")
        elem!.style.height = `${elem!.offsetHeight.toString()}px`
    }, [contentStyle]);

    return(
        <Container fluid id="root-container" className="d-flex flex-column vh-100" style={{backgroundImage: `url(${background})`, backgroundSize: "cover"}}>
            <Row id="header" className="bg-dark flex-shrink-0">
                <Col>
                    <Header />
                </Col>
            </Row>
            <Row id="content" className="flex-grow-1" style={contentStyle}>
                <Col xs={8} id="editor" className="h-100">
                    <Quill textToAppend={textToAppend}/>
                </Col>
                <Col xs={4} id="chatbox" className="h-100">
                    <ChatBox setSelectedButtonText={setTextToAppend}/>
                </Col>
            </Row>            
        </Container>
    )
}

export default App