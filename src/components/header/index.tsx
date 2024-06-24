import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"

interface IHeader{
    className: string
}

const Header: React.FC<IHeader> = ({className}) => {
    return (
        <Container className={className}>
            <Row>
                <h4>Law Copilot</h4>
            </Row>
        </Container>
    )
} 

export default Header;