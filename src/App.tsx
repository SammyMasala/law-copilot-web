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
        <Container fluid style={{height: '125vh' }}>
            <Row style={{height: '10%' }}>
                <Col>
                    <Header />
                </Col>
            </Row>
            <Row style={{height: '75%' }}>
                <Col md={8} style={{height: '100%' }}>
                    <Quill updateInput={setText}/>
                </Col>
                <Col style={{height: '100%' }}>
                    <ChatBox />
                </Col>
            </Row>
            <Row style={{height: '15%' }}>
                <Col>
                    <Footer />
                </Col>
            </Row>
        </Container>
    )
}

export default App