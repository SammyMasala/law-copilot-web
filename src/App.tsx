import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 
import Quill from "./components/quill";
import GPTBox from "./components/gptbox";

const App:React.FC = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Quill />
                </Col>
                <Col>
                    <GPTBox />
                </Col>
            </Row>
        </Container>
    )
}

export default App;