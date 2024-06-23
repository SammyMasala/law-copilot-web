import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { getMessageResponse } from '../../api';

import bot from '../../static/bot.png';
import user from '../../static/user.png';
import MessageInput from './messageInput';
import ChatBubble from './chatBubble';

interface IMessage{
    text: string,
    isUser: boolean
}

interface ISelectedButton{
    message: string
}

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
        <Container>
            <ListGroup>
                {messages.map((message, index) => {
                    return (
                        <ListGroup.Item id={index.toString()}>
                            <ChatBubble 
                                selectTextBubble={handleSelectButton} 
                                message={message.text} 
                                isUser={message.isUser} 
                            />
                        </ListGroup.Item>                        
                    )
                })}
            </ListGroup>
            <MessageInput 
                submitMessage={handleFormSubmit}
            />
        </Container>
    )
}

export default ChatBox;
export { IMessage, ISelectedButton }