import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import trello from "../../static/icons8-trello-25.png"
import github from "../../static/icons8-github-25.png";
import book from "../../static/icons8-book-25.png"
import { URL_GITHUB, URL_ICONS8, URL_TRELLO } from "../../config";

interface IHeaderProps {
    context: React.Context<any>
}

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
    const {sessionURL} = useContext(props.context)
    return (
        <Container fluid>
            <Row className="d-flex">
                <Col className="d-flex justify-content-start">
                    <a href={sessionURL} className="me-1">
                        <Image className="bg-light" src={book} roundedCircle/>
                    </a>
                    <div> Law Copilot </div>
                </Col>
                <Col xs={2} className="d-flex justify-content-center">   
                                 
                </Col>
                <Col className="d-flex justify-content-end">
                    <a href={URL_TRELLO} className="me-1">
                        <Image className="bg-light" src={trello} rounded/>
                    </a>    
                    <a href={URL_GITHUB} className="me-1">
                        <Image className="bg-light" src={github} roundedCircle/>
                    </a>    
                    <div>Icons by:</div>
                    <a href={URL_ICONS8} className="ms-1 me-1">Icon8</a>
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