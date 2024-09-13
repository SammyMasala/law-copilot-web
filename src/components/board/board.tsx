import React, { useCallback, useContext, useEffect, useRef, useState } from "react"
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { 
    ReactFlow,
    Background,
    BackgroundVariant,
    Node,
    applyNodeChanges,
    NodeChange,
} from "@xyflow/react";

import '@xyflow/react/dist/style.css';
import { NoteNode } from "./noteNode";
import { Note, NoteNodeData } from "./types";
import { mapNotetoNoteNode } from "./mapper";
import { NodeBase } from "@xyflow/system";
import { InputGroup } from "react-bootstrap";
import chatResponse from "@src/api/chat.api";
import { Message } from "../chatbox/types";

interface IBoardProps{
    context: React.Context<any>
}

const testNote: Note = {
    subject: "Jane",
    content: {
        overview: "She was aged 25"
    }
}

export const Board: React.FC<IBoardProps> = (data: IBoardProps) => {
    const {context} = data
    const {messages, setMessages, noteNodes, setNoteNodes} = useContext(context)
    const [newNote, setNewNote] = useState<Note | null>(null)
    const [isInputEnabled, setIsInputEnabled] = useState<boolean>(true)
    const [input, setInput] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null)
    const noteTypes = {noteNode: NoteNode}

    useEffect(()=> {
        if(!newNote){
            return
        }
        addNode(newNote);
        setNewNote(null)
    }, [newNote])

    useEffect(() => {
        if (isInputEnabled) {
            inputRef!.current!.disabled = false;
            inputRef!.current!.placeholder = "A subject in UK law..."
        } else {
            inputRef!.current!.disabled = true;
            inputRef!.current!.placeholder = "...awaiting reply..."
        }
    }, [isInputEnabled])

    useEffect(() => {
        if (!messages.length || !messages.at(-1).isUser) {
            return
        }
        
        const sendMessage = async (messages: Message[]) => {
            const response = await chatResponse(messages);
            const note: Note = {
                subject: response?.subject || "TestImplementation",
                content: response?.content || {}
            }
            setNewNote(note)
        }

        if (messages.length && messages.at(-1)?.isUser) {
            console.log("note")
            setIsInputEnabled(prev => false)
            sendMessage(messages).catch(err => {
                console.error(err)
            }).then(() => {
                setIsInputEnabled(prev => true)
                setMessages([])
            })
        }
    }, [messages])

    function handleSubmitQuery(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        const message = {
            message: `Tell me about ${input} in UK law`,
            isUser: true
        }
        setMessages([message])
        setInput("")
    }

    function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = e.target;
        setInput(value)
    }

    // Define the onNodesChange handler
    const onNoteNodesChange = useCallback(
        (changes: NodeChange[]) => {
            // Apply changes to the existing nodes
            setNoteNodes((nds: NodeBase[]) => applyNodeChanges(changes, nds));
        },
        [noteNodes]
    );

    const deleteNode = useCallback((id: string) => {
        setNoteNodes((prev: Node[]) => prev.filter(item => item.id !== id))
    }, [setNoteNodes])

    const addNode = useCallback((note: Note) => {
        const testNode: Node = mapNotetoNoteNode(note, deleteNode)
        setNoteNodes((prev: Node[]) => [...prev, testNode])
    }, [setNoteNodes])

    return (
        <Container style={{width: "100vw", height: "75vh"}}>
            <Row>
                <Form onSubmit={handleSubmitQuery}>
                    <InputGroup >
                        <InputGroup.Text>Tell me about</InputGroup.Text>
                        <Form.Control
                            placeholder="Promissory Estoppel"
                            aria-label="Input field for what to search about"
                            type="text"
                            name="input"
                            ref={inputRef}
                            value={input}
                            onChange={handleChangeInput}
                        />
                        <Button type="submit">Submit</Button>
                    </InputGroup>
                </Form>
            </Row>
            <Row>
                <ReactFlow 
                    nodes={noteNodes} 
                    onNodesChange={onNoteNodesChange}
                    nodeTypes={noteTypes}
                >
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
                </ReactFlow>
            </Row>            
        </Container>
    )
}