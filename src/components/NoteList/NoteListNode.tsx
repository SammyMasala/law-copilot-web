import { NoteNodeType } from "@src/entities/notes";
import React, { useState } from "react"
import { Card, CloseButton, Collapse, ToggleButton } from "react-bootstrap";

export type NoteListNodeProps = {
    node: NoteNodeType
}

export const NoteListNode: React.FC<NoteListNodeProps> = ({node}) => {
    const {data} = node
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)
    function handleDelete():void {
        data.deleteNote(node.id)
    }
    return (
        <Card className="bg-dark text-light">
            <Card.Header className="d-flex" onClick={() => setCollapsed(!collapsed)}>
                <Card.Title className="flex-grow-1">{data.note.content["Type"] ? data.note.content["Type"]: "General"} - {data.note.subject}</Card.Title>
                <CloseButton className="flex" variant="white" onClick={handleDelete}/>
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