import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup"
import { getMessageResponse } from "../../api";

import MessageInput from "./messageInput";
import ChatBubble from "./chatBubble";

import "./styles.css";
import type { 
    IChatBoxProps, 
    IChatBubbleStyle, 
    IMessage, 
    ISelectedButton 
} from "./interfaces";
import type { 
    IChatBoxProps, 
    IChatBubbleStyle, 
    IMessage, 
    ISelectedButton 
} from "./interfaces";

const ChatBox: React.FC<IChatBoxProps> = ({setSelectedButtonText, messagesToAppend, setCurrentMessages}) => {
    const [messages, setMessages] = useState<IMessage[]>([])

    // Append Past Messages
    useEffect(() => {
        const appendMessagesToChatbox = () => {
            setMessages([...messagesToAppend, ...messages])                
        }

        if(messagesToAppend.length){
            appendMessagesToChatbox()
        }
    }, [messagesToAppend])

    // Pass Messages to parent
    useEffect(() => {
        if(messages.length){
            setCurrentMessages(messages)
        }
    }, [messages])

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
        }catch(err){
            console.error(err)
            handleFormSubmitError()
        }
        
    }

    const handleSelectButton = (selected: ISelectedButton) => {
        setSelectedButtonText(selected.message)
    }

    const handleFormSubmitError = () => {
        //TODO: Show message notifying user of service error near input area
    }
    
    return (
        <Container fluid className="bg-dark bg-opacity-25 d-flex h-100 p-1 flex-column">
            <Row className="flex-grow-1 m-1 p-1 overflow-auto">
                <ListGroup>
                    {messages.map((message, index) => {
                        const bubbleStyle: IChatBubbleStyle = {
                            variant: message.isUser === true ? "dark": "secondary",
                            className: "button-wrap text-start"
                        }
                        return (  
                            <ListGroup.Item 
                                id={`list-item-${index.toString()}`}
                                className={`border border-0 bg-transparent d-flex ${message.isUser === true ? "justify-content-end": "justify-content-start"}`}
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
            <Row className="mb-1 p-1">
            <Row className="mb-1 p-1">
                <MessageInput 
                    submitMessage={handleFormSubmit}
                />
            </Row>            
        </Container>
    )
}

export default ChatBox;
export { IMessage, ISelectedButton }