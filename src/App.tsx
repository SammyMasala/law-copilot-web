import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Quill from "./components/quill";
import ChatBox from "./components/chatbox";
import Header from "./components/header";
import Footer from "./components/footer";

const App: React.FC = () => {
    const [text, setText] = useState<string>("")
    return(
        <>
            <Header className="vh-25"/>
            <Container className="vh-100">            
                <Row className="h-100">
                    <Col className="h-100 w-50">
                        <Quill updateInput={setText}/>
                    </Col>
                    <Col className="h-100 w-50">
                        <ChatBox />
                    </Col>
                </Row>
            </Container>
            <Footer className="vh-25" />
        </>
    )
}

export default App