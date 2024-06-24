import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"

// interface IFooter {
//     className: string
// }

const Footer: React.FC = () => {
    return (
        <Container>
            <Row>
                <a href="https://github.com/SammyMasala/law-copilot-webs">GitHub Page</a>
            </Row>
        </Container>
    )
} 

export default Footer;