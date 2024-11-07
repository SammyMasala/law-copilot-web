
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Container, Form, ListGroup } from "react-bootstrap";

import { InputGroup } from "react-bootstrap";

import { ChatMessage } from "@src/entities";
import { NoteNodeData, NoteNodeType } from "@src/entities/notes";
import { NoteListNode } from "./NoteListNode";

export type NoteListProps = {
    context: React.Context<any>
}

export const NoteList: React.FC<NoteListProps> = (props: NoteListProps) => {
    const {context} = props;
    const [subjectInput, setSubjectInput] = useState<string>("")
    const {noteNodes, setNoteNodes, messages, setMessages, loadNewSubject} = useContext(context);

    useEffect(() => {  
        if(!messages.length){
            return
        }      

        loadNewSubject();
        setMessages([])
        setSubjectInput("");
    }, [messages])

    async function handleSubmitSubject(e: React.ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        if(!subjectInput){
            return
        }
        // LEGACY
        const newSubject: ChatMessage = {
            isUser: true,
            message: `Tell me about ${subjectInput} in UK Law`
        }

        setMessages([newSubject])
    }

    async function handleUpdateSubjectInput(e: React.ChangeEvent<HTMLInputElement>){
        setSubjectInput(e.target.value)
    }

    return (
        <Container className="d-flex flex-column fluid">
            <Form onSubmit={handleSubmitSubject}>
                <InputGroup>
                    <InputGroup.Text>Tell me about...</InputGroup.Text>
                    <Form.Control                         
                        placeholder="A subject in UK Law..."
                        aria-label="text input for subject to search"
                        value={subjectInput}
                        onChange={handleUpdateSubjectInput}
                    />
                    <Button type="submit" aria-label="submit button for subject search">Submit</Button>
                </InputGroup>
            </Form>
            <ListGroup>
                {noteNodes.map((node: NoteNodeType, index: number) => {
                    return (
                        <ListGroup.Item 
                            key={`entry-${index}`}
                            className="p-0"
                        >
                            <NoteListNode node={node}/>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </Container>
    )
}