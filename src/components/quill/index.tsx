import React, { LegacyRef, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new"; 
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "react-quill-new/dist/quill.snow.css";
import "./style.css";
import { exportToPDF } from "../../libs";

interface IQuillProps{
    textToAppend: string
}

const Quill: React.FC<IQuillProps> = ({textToAppend}) => { 
    const [textHTML, setTextHTML] = useState<string>("");
    const quillRef = useRef<ReactQuill>(null) 

    useEffect(() => {
        const appendTextToQuill = () => {
            if(textToAppend.trim()){
                // TODO append text to Quill editor 
                console.log(textToAppend)
            }
        }
        appendTextToQuill()
    }, [textToAppend])

    const updateTextHTML = () => {
        try{
            const editor = quillRef!.current?.getEditor()
            setTextHTML(quillRef!.current?.makeUnprivilegedEditor(editor!).getHTML()!)
        }catch(err){
            console.error(err)
        }
    }

    const handleExportPDF = () => {
        try{
            exportToPDF(textHTML)
        }catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        if(!textToAppend.trim()){
            return
        }

    }, [textToAppend])
    
    return (
        <Container fluid className="h-100 d-flex flex-column">
            <Row className="flex-grow-1 p-1 overflow-auto">
                <ReactQuill theme="snow" onChange={updateTextHTML} ref={quillRef}/>
            </Row>
            <Row>
                <Col className="d-flex p-2">                
                    <Button className="flex-grow-1">Save as .docx</Button>
                </Col>
                <Col className="d-flex p-2">                
                    <Button className="flex-grow-1" onClick={handleExportPDF}>Save as .pdf</Button>
                </Col>
            </Row>
        </Container>
    )
} 

export default Quill;