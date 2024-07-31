import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import chatResponse from "../../api/chat.api";
import { SessionContext } from "../../App";

export interface IMessage {
    message: string;
    isUser: boolean;
}

const Chatbox: React.FC = () => {
    const {messages, setMessages} = useContext(SessionContext)
    const [input, setInput] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const quillContainer = document.querySelector("#chatbox-messages") as HTMLElement
        if (quillContainer) {
            quillContainer.style.height = `${quillContainer.offsetHeight.toString()}px`;
        }
    }, [])

    // Disable chatbox while waiting for reply
    useEffect(() => {
        const sendMessage = async(messages: IMessage[]) => {
            const reply = {
                message: await chatResponse(messages),
                isUser: false
            }
            setMessages([...messages, reply])
        }

        const enableInputButton = (isEnabled: boolean = true) => {
            if(isEnabled){
                inputRef!.current!.disabled = false;
                inputRef!.current!.placeholder = "Ask about..."   
            }else{
                inputRef!.current!.disabled = true;
                inputRef!.current!.placeholder = "...awaiting reply..."   
            }
        }

        if (messages.length && messages.at(-1)?.isUser) {
            enableInputButton(false)
            sendMessage(messages).catch(err => {
                console.error(err)
            }).then(() => {
                enableInputButton()
            })            
        } 
    }, [messages])

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput(value)
    }

    const handleSubmitInput = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const message = {
            message: input,
            isUser: true
        }
        setMessages([...messages, message])
        setInput("")
    }
    return (
        <Container className="d-flex flex-column">
            <Row id="chatbox-messages" className="flex-grow-1 overflow-auto">
                <ListGroup>
                    {messages.map((message: IMessage, index: number) => {
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
                                            overflowWrap: "break-word",
                                            textAlign: "justify"
                                        }
                                    }
                                >
                                    {message.message}
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