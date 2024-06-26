import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import book from "../../static/icons8-book-25.png";
import github from "../../static/icons8-github-25.png";

const Header: React.FC = () => {
    return (
        <Container fluid className="bg-dark text-light">
            <Row className="m-1">
                <Col className="d-flex align-item-center justify-content-start">
                    <Image className="m-1" src={book} roundedCircle />
                    <div className="mt-auto mb-auto fw-bold">Law Co-Pilot</div>
                </Col>
                <Col className="d-flex justify-content-center">
                    <a href="https://github.com/SammyMasala/law-copilot-web">
                        <Image className="bg-light m-1" src={github} roundedCircle/>
                    </a>
                </Col>
                <Col className="d-flex justify-content-end">
                    <div className="mt-auto mb-auto">Icons by:</div> 
                    <a className="mt-auto mb-auto" href="https://icons8.com/icons">Icon8</a>
                    <div className="mt-auto mb-auto">,</div> 
                    <div className="mt-auto mb-auto">BG by:</div>  
                    <a className="mt-auto mb-auto" href="https://www.freepik.com/free-vector/cyber-technology-background_6402688.htm#query=it%20background&position=0&from_view=keyword&track=ais_user&uuid=73e9c954-6e54-4d16-95da-ffdf53aff0ab">Freepik</a>
                </Col>
            </Row>
        </Container>
    )
} 

export default Header;