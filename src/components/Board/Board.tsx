import { applyNodeChanges, Background, BackgroundVariant, Controls, MiniMap, Node, OnNodesChange, ReactFlow } from "@xyflow/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

import "@xyflow/react/dist/style.css";
import { InputGroup } from "react-bootstrap";

import NoteNode from "./NoteNode"
import { ChatMessage } from "@src/entities";
import { NoteNodeType } from "@src/entities/notes";

export type BoardProps = {
    context: React.Context<any>
}

export const Board: React.FC<BoardProps> = (props: BoardProps) => {
    const {context} = props;
    const [subjectInput, setSubjectInput] = useState<string>("")
    const {noteNodes, setNoteNodes, messages, setMessages, loadNewSubject} = useContext(context);
    const nodeTypes = {noteNode: NoteNode}

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

    const onNodesChange: OnNodesChange = useCallback((changes) => {
        setNoteNodes((noteNodes: NoteNodeType[]) => applyNodeChanges(changes, noteNodes))
    }, [setNoteNodes])

    return (
        <Container className="d-flex flex-column" style={{"height": "100vh"}}>
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
            <ReactFlow 
                className="flex-grow-1"
                nodes={noteNodes}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
            >
                
                <MiniMap />
                <Controls />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
            </ReactFlow>
        </Container>
    )
}