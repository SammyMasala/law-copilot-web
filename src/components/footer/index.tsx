import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"

// interface IFooter {
//     className: string
// }

const Footer: React.FC = () => {
    return (
        <Container>
            <Row className="d-inline-flex">
                Icons by 
                <a href="https://icons8.com/icons">Icon8</a>
            </Row>
        </Container>
    )
} 

export default Footer;