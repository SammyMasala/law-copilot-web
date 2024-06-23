import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Quill from "./components/quill";
import ChatBox from "./components/chatbox/";

const App: React.FC = () => {
    const [text, setText] = useState<string>("")
    return(
        <Container fluid>
            <Row>
                <Col>
                    <Quill updateInput={setText}/>
                </Col>
                <Col>
                    <ChatBox />
                </Col>
            </Row>
        </Container>
    )
}

export default App