import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import { getMessageResponse } from '../../api';

import MessageInput from './messageInput';
import ChatBubble from './chatBubble';

import "./styles.css";
import type { IChatBubbleStyle, IMessage, ISelectedButton } from './interfaces';

const ChatBox: React.FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([])
    const [selectedButton, setSelectedButton] = useState<ISelectedButton>()

    const handleFormSubmit = async (messageInput: string) => {
        try{
            const newMessage: IMessage = {
                text: messageInput,
                isUser: true
            }
            setMessages(prevState => ([...prevState, newMessage]))

            // Send message, await message reply
            const reply: IMessage = {
                text: await getMessageResponse(messageInput),
                isUser: false
            }

            setMessages(prevState => ([...prevState, reply]))   
            console.log(messages)         
        }catch(err){
            console.error(err)
            handleFormSubmitError()
        }
        
    }

    const handleSelectButton = (selected: ISelectedButton) => {
        setSelectedButton(selected)
    }

    const handleFormSubmitError = () => {
        //TODO: Show message notifying user of service error near input area
    }
    
    return (
        <Container fluid className='h-100'>
            <Row className='cb-container h-75'>
                <ListGroup>
                    {messages.map((message, index) => {
                        const bubbleStyle: IChatBubbleStyle = {
                            variant: message.isUser === true ? "dark": "secondary",
                            className: "button-wrap text-start"
                        }
                        return (  
                            <ListGroup.Item 
                                id={index.toString()}
                                className={message.isUser === true ? "d-flex justify-content-end": "d-flex justify-content-start"}
                            >                                    
                                <ChatBubble 
                                    selectTextBubble={handleSelectButton} 
                                    message={message} 
                                    bubbleStyle={bubbleStyle}
                                />
                            </ListGroup.Item>                        
                        )
                    })}
                </ListGroup>
            </Row>            
            <Row className='h-25'>
                <MessageInput 
                    submitMessage={handleFormSubmit}
                />
            </Row>            
        </Container>
    )
}

export default ChatBox;
export { IMessage, ISelectedButton }