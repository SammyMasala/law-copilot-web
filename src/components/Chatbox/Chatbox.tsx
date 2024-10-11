import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { ChatService } from "@src/services";
import { ChatMessage } from "@src/entities";

interface IChatboxProps{
    context: React.Context<any>
}
    
export const Chatbox: React.FC<IChatboxProps> = (props: IChatboxProps) => {
    const chatService = new ChatService();
    const {context} = props
    const { messages, setMessages } = useContext(context)
    const [isInputEnabled, setIsInputEnabled] = useState<boolean>(true)
    const [input, setInput] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const chatboxContainer = document.querySelector("#chatbox-messages") as HTMLElement
        if (chatboxContainer) {
            chatboxContainer.style.height = `${chatboxContainer.offsetHeight.toString()}px`;
        }
    }, [])

    // Disable chatbox while waiting for reply
    useEffect(() => {
        if (!messages.length || !messages.at(-1).isUser) {
            return
        }
        const sendMessage = async (messages: ChatMessage[]) => {
            const reply = {
                message: await chatService.chatQuery(messages),
                isUser: false
            }
            setMessages([...messages, reply])
        }

        if (messages.length && messages.at(-1)?.isUser) {
            setIsInputEnabled(prev => false)
            sendMessage(messages).catch(err => {
                console.error(err)
            }).then(() => {
                setIsInputEnabled(prev => true)
            })
        }
    }, [messages])

    useEffect(() => {
        if (isInputEnabled) {
            inputRef!.current!.disabled = false;
            inputRef!.current!.placeholder = "Ask about..."
        } else {
            inputRef!.current!.disabled = true;
            inputRef!.current!.placeholder = "...awaiting reply..."
        }
    }, [isInputEnabled])

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
                    {messages.map((message: ChatMessage, index: number) => {
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