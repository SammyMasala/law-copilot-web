import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import github from "../../static/icons8-github-25.png";
import book from "../../static/icons8-book-25.png"

interface IHeaderProps {
    context: React.Context<any>
}

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
    const {sessionURL} = useContext(props.context)
    return (
        <Container fluid>
            <Row className="d-flex">
                <Col className="d-flex justify-content-start">
                    <Image className="bg-light" src={book} roundedCircle/>
                    <div> Law Copilot </div>
                </Col>
                <Col xs={2} className="d-flex justify-content-center">   
                    <a href="https://github.com/SammyMasala/law-copilot-web">
                        <Image className="bg-light" src={github} roundedCircle/>
                    </a>                 
                </Col>
                <Col className="d-flex justify-content-end">
                    <div>Icons by:</div>
                    <a href="https://icons8.com/icons">Icon8</a>
                </Col>
            </Row>
            <Row className="d-flex">
                <Col xs={12} className="d-flex justify-content-center">   
                    *** SAVE THIS LINK TO YOUR SESSION ***
                    <a href={sessionURL}>
                        {sessionURL}
                    </a>                 
                </Col>
            </Row>
        </Container>
    )
}

export default Header;