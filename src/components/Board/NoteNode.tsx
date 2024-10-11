import { NoteNodeType } from "@src/libs";
import { NodeProps } from "@xyflow/react";
import React, { useState } from "react"
import { Card, CloseButton, Collapse, ToggleButton } from "react-bootstrap";

export default function NoteNode({data}: NodeProps<NoteNodeType>){
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)
    function handleDelete():void {
        data.deleteNote(data.id)
    }
    return (
        <Card className="bg-dark text-light" style={{width: "25rem"}}>
            <Card.Header className="d-flex" onClick={() => setCollapsed(!collapsed)}>
                <Card.Title className="flex-grow-1">{data.note.subject}</Card.Title>
                <CloseButton style={{right: 0}} variant="white" onClick={handleDelete}/>
            </Card.Header>
            <Collapse in={collapsed}>
                <Card.Body style={{maxHeight: "25rem", overflow:"auto"}}>
                    {Object.entries(data.note.content).map(([key, value]) => {
                        return (
                            <div key={key}>
                                <Card.Title>{key}</Card.Title>
                                <Card.Text style={{whiteSpace: "pre-line"}}>{value}</Card.Text>
                            </div>
                        )
                    })}
                </Card.Body>
            </Collapse>
            <Card.Footer className="d-flex justify-content-end">
                <ToggleButton 
                    type="checkbox" 
                    id="toggle-check" 
                    checked={checked} 
                    variant="outline-primary"
                    value={data.id}
                    onClick={() => setChecked(!checked)}
                >
                </ToggleButton>
            </Card.Footer>
        </Card>
    )
}