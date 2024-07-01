import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Quill from "./components/quill";
import ChatBox, { IMessage } from "./components/chatbox";
import Header from "./components/header";

import background from "./static/bg-image.jpg"; 

const App: React.FC = () => {
    const defautContentStyle = { height: "1000px" }
    const [contentStyle, setContentStyle] = useState<{height: string}>(defautContentStyle)

    const [currentMessages, setCurrentMessages] = useState<IMessage[]>([])
    const [currentDocument, setCurrentDocument] = useState<string>()

    const [textToAppend, setTextToAppend] = useState<string>("")
    const [messagesToAppend, setMessagesToAppend] = useState<IMessage[]>([]) 

    // TODO Load Prior Save (API)
    // TODO Load Prior Save (API)
    useEffect(() => {
    }, [])

    // DEBUG: print current document and message
    // useEffect(() => {
    //     console.log(currentDocument)
    // }, [currentDocument])
    // useEffect(() => {
    //     console.log(currentMessages)
    // }, [currentMessages])

    // Reset textToAppend
    useEffect(() => {
        if(textToAppend.trim()){
            setTextToAppend("")
        }
    }, [textToAppend])

    // Reset messagesToAppend
    useEffect(() => {
        if(messagesToAppend.length){
            setMessagesToAppend([])
        }
    }, [messagesToAppend])
    
    // Set editor height (enable overflow)
    useEffect(() => {
        const elem = document.getElementById("content")
        elem!.style.height = `${elem!.offsetHeight.toString()}px`
    }, [contentStyle]);

    return(
        <Container fluid id="root-container" className="d-flex flex-column vh-100">
            <Row id="header" className="bg-dark flex-shrink-0">
                <Col>
                    <Header />
                </Col>
            </Row>
            <Row id="content" className="flex-grow-1" style={contentStyle}>
                <Col xs={8} id="editor" className="border h-100 p-1">
                    <Quill textToAppend={textToAppend} setCurrentDocument={setCurrentDocument}/>
                </Col>
                <Col xs={4} id="chatbox" className="h-100">
                    <ChatBox setSelectedButtonText={setTextToAppend} messagesToAppend={messagesToAppend} setCurrentMessages={setCurrentMessages}/>
                </Col>
            </Row>
        </Container>
    )
}

export default App