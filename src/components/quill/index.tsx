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

    // Append text to Quill editor 
    useEffect(() => {
        const appendTextToQuill = () => {
            if(textToAppend.trim()){
                const range = quillRef!.current?.getEditor().getLength() 
                quillRef!.current?.getEditor().insertText(range || 0, `${textToAppend}\n`);
    
                console.log(textToAppend)
            }
        }
        appendTextToQuill()
    }, [textToAppend])

    // Manage state for text contents
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
    
    return (
        <Container fluid className="h-100 d-flex flex-column">
            <Row className="flex-grow-1 m-2 ml-4 mr-4 p-0 h-100">
                <ReactQuill theme="snow" onChange={updateTextHTML} className="bg-light bg-opacity-90 rounded h-100 p-0 m-2 overflow-auto" ref={quillRef}/>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center p-2">                
                    <Button variant="dark">Save as .docx</Button>
                </Col>
                <Col className="d-flex justify-content-center p-2">                
                    <Button variant="secondary" onClick={handleExportPDF}>Save as .pdf</Button>
                </Col>
            </Row>
        </Container>
    )
} 

export default Quill;