import React, { useEffect, useState } from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button";
import ReactQuill, { EmitterSource } from "react-quill-new"; 
import Delta from "quill-delta"; 

import "react-quill-new/dist/quill.snow.css";

interface IEditorProps{
    onChange: (document: string) => void
}
const Editor: React.FC<IEditorProps> = ({onChange}) => {
    const [documentHTML, setDocumentHTML] = useState<string>("")

    // Chain update to parent
    useEffect(() => {
        onChange(documentHTML)
    },[documentHTML])

    const handleChangeDocument = (value: string, delta: Delta, source: EmitterSource, editor: ReactQuill.UnprivilegedEditor) => {
        setDocumentHTML(editor.getHTML())
    } 


    return (
        <Container>
            <Row id="editor-save"></Row>
            <Row id="editor-quill">
                <ReactQuill theme="snow" onChange={handleChangeDocument}/>
            </Row>
        </Container>
    )
} 

export default Editor; 