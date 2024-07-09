import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import getResponse from "../../api/getResponse";

export interface IMessage{
    text: string;
    isUser: boolean;
}

interface IChatboxProps{
    onChange: (messages: IMessage[]) => void
}

const Chatbox: React.FC<IChatboxProps> = ({onChange}) => {
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<IMessage[]>([]); 
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const quillContainer = document.querySelector("#chatbox-messages") as HTMLElement 
        if(quillContainer){
            quillContainer.style.height = `${quillContainer.offsetHeight.toString()}px`;
        }
    }, [])

    // Disable chatbox while waiting for reply
    useEffect(() => {
        if (messages.length && messages.at(-1)?.isUser){
            inputRef!.current!.disabled = true;
            inputRef!.current!.placeholder = "...awaiting reply..."
        } else {
            inputRef!.current!.disabled = false;
            inputRef!.current!.placeholder="Ask about..."
        }

        //Chain to parent
        onChange(messages)
    }, [messages])

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInput(value)
    }

    const handleSubmitInput = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const message = {
            text: input, 
            isUser: true
        }
        setMessages (prev => ([...prev, message]))
        setInput("")

        const reply = {
            text: await getResponse(message.text),
            isUser: false
        }
        setMessages (prev => ([...prev, reply]))

    }
    return (
        <Container className="d-flex flex-column">
            <Row id="chatbox-messages" className="flex-grow-1 overflow-auto">
                <ListGroup>
                    {messages.map((message, index) => {
                        return (
                            <ListGroup.Item 
                                className={`d-flex border border-0 bg-transparent 
                                ${message.isUser === true ? "justify-content-end" : "justify-content-start"}`}                                
                                key={`list-${index}`}
                            >
                                <Button 
                                variant={`${message.isUser === true ? "dark" : "secondary"}`} 
                                style={
                                    {
                                        wordBreak: "break-all",
                                        overflowWrap: "break-word"
                                    }
                                }
                                >
                                    {message.text}
                                </Button> 
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>

            </Row>
            <Row id="chatbox-input">
                <Form className="d-flex" onSubmit={handleSubmitInput}>
                    <Form.Control 
                        type="text"
                        name="input"
                        ref={inputRef}
                        value={input}
                        aria-describedby="user message input block"
                        onChange={handleChangeInput}
                    />
                    <Button variant="dark" type="submit">{"Send"}</Button>
                </Form>
            </Row>
        </Container>
    )
}

export default Chatbox;