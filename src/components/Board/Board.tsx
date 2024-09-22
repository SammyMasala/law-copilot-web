import React, { Context, useContext } from "react";
import { Container } from "react-bootstrap";

export type BoardProps = {
    context: React.Context<any>
}

export const Board: React.FC<BoardProps> = (props: BoardProps) => {
    const {context} = props;
    const {} = useContext(context);


    return (
        <Container style={{"height": "100vh"}}>
        </Container>
    )
}