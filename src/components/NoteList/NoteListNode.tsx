import { NoteNodeType } from "@src/entities/notes";
import React, { useContext, useEffect, useState } from "react"
import { Card, CloseButton, Collapse, ToggleButton } from "react-bootstrap";

export type NoteListNodeProps = {
    node: NoteNodeType
    context: React.Context<any>
}

export const NoteListNode: React.FC<NoteListNodeProps> = ({node, context}) => {
    const {data} = node
    const {noteNodes, setNoteNodes} = useContext(context)
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(data.selected)
    function handleDelete():void {
        setNoteNodes(noteNodes.filter((node: NoteNodeType) => node.id !== data.id))
    }

    useEffect(() => {
        const newNoteNodes = noteNodes.map((node: NoteNodeType) => node.id !== data.id ? node : {...node, data: {
            ...node.data,
            selected: checked
        }})
        setNoteNodes(newNoteNodes)
    },[checked])

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