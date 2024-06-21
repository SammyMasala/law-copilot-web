import React, { FormEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { getMessageResponse } from '../api';

import bot from '../static/bot.png';
import user from '../static/user.png';

interface IMessage{
    text: string,
    isUser: boolean
}

interface IChatBoxInput{
    messageInput: string
}


const ChatBox: React.FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([])
    const [formData, setFormData] = useState<IChatBoxInput>({messageInput: ""})

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const newMessage: IMessage = {
                text: formData.messageInput,
                isUser: true
            }
            setMessages(prevState => ([...prevState, newMessage]))

            // Reset form
            setFormData({messageInput: ""})

            // Send message, await message reply
            const reply: IMessage = {
                text: await getMessageResponse(formData.messageInput),
                isUser: false
            }

            setMessages(prevState => ([...prevState, reply]))   
            console.log(messages)         
        }catch(err){
            console.error(err)
            handleFormSubmitError()
        }
        
    }

    const handleFormChangeUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmitError = () => {
        //TODO: Show message notifying user of service error near input area
    }
    
    return (
        <>
        <ListGroup>
            {messages.map((message, index) => {
                return (
                    <ListGroup.Item id={"message" + index.toString()}>
                        <h4>{message.text}</h4>
                        <Image src={message.isUser === true ? user : bot} />
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
        <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId='formTextInput'>
                <Form.Control 
                type='text' 
                placeholder='Insert message here...' 
                aria-describedby='userInputField' 
                name='messageInput' 
                value={formData.messageInput}
                onChange={handleFormChangeUserInput}              
                />
                <Button type='submit'>Submit</Button>
            </Form.Group>
        </Form>
        </>
    )
}

export default ChatBox;