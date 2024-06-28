import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import type { ISubmitMessageProp, IMessageInput } from "./interfaces";

const MessageInput: React.FC<ISubmitMessageProp> = ({submitMessage}) => {
    const initState = {
        messageInput: ""
    }
    const [message, setMessage] = useState<IMessageInput>(initState)

    const handleUpdateMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setMessage({
            ...message, 
            [name]: value
        })
    }
    const handleSubmitMessage = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        
        if(message.messageInput.trim()){
            submitMessage(message.messageInput);
            setMessage(initState);
        }
    }

    return (
        <Form onSubmit={handleSubmitMessage}>
                <Form.Group controlId="formTextInput">
                    <Container fluid>
                        <Row>
                            <Col>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Insert message here..." 
                                    aria-describedby="userInputField" 
                                    name="messageInput" 
                                    value={message.messageInput}
                                    onChange={handleUpdateMessage}              
                                />
                            </Col>
                            <Col>
                                <Button type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Container>                
                </Form.Group>
            </Form>
    )
}

export default MessageInput;
export {IMessageInput}