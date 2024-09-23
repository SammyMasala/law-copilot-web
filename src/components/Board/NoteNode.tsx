import React, { useContext } from "react"
import { Card, CardGroup } from "react-bootstrap";

type NoteNodeProps = {
    context: React.Context<any>
}

export const NoteNode: React.FC<NoteNodeProps> = (props: NoteNodeProps) => {
    const {context} = props;
    const {} = useContext(context)

    return (
        <CardGroup>
            <Card.Header></Card.Header>
            <Card.Body></Card.Body>
            <Card.Footer></Card.Footer>
        </CardGroup>
    )
}