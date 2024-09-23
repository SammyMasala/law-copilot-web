import { Background, BackgroundVariant, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

import "@xyflow/react/dist/style.css";
import { InputGroup } from "react-bootstrap";

export type BoardProps = {
    context: React.Context<any>
}

export const Board: React.FC<BoardProps> = (props: BoardProps) => {
    const {context} = props;
    const [subjectInput, setSubjectInput] = useState<string>("")
    const {} = useContext(context);

    async function handleSubmitSubject(e: React.ChangeEvent<HTMLFormElement>){
        e.preventDefault();
    }

    async function handleUpdateSubjectInput(e: React.ChangeEvent<HTMLInputElement>){
        setSubjectInput(e.target.value)
    }

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
            <ReactFlow className="flex-grow-1">
                <MiniMap />
                <Controls />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
            </ReactFlow>
        </Container>
    )
}