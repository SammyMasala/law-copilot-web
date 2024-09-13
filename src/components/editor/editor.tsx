import React, { useContext, useEffect, useRef, useState } from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button";
import ReactQuill, { EmitterSource } from "react-quill-new"; 
import Delta from "quill-delta"; 

import "react-quill-new/dist/quill.snow.css";
import docx from "../../static/icons8-docx-50.png";
import pdf from "../../static/icons8-pdf-50.png"; 
import { exportDOCX, exportPDF } from "../../libs/exportFile";

interface IEditorProps{
    context: React.Context<any>
}

export const Editor: React.FC<IEditorProps> = (props: IEditorProps) => {
    const {context} = props
    const {docHTML, setDocHTML, isLoaded} = useContext(context)
    const quillRef = useRef<ReactQuill>(null)

    useEffect(() => {
        const quillContainer = document.querySelector(".ql-container") as HTMLElement 
        if(quillContainer){
            quillContainer.style.height = `${quillContainer.offsetHeight.toString()}px`;
        }
    }, [])

    useEffect(() => {
        if(!isLoaded){
            return
        }
        const editor = document.getElementsByClassName('ql-editor')
        editor[0].innerHTML = docHTML
    }, [isLoaded])

    const handleChangeDocument = (value: string, delta: Delta, source: EmitterSource, editor: ReactQuill.UnprivilegedEditor) => {
        setDocHTML(editor.getHTML())
    } 

    const handleExportPDF = () => {
        exportPDF(docHTML);
    }

    const handleExportDOCX = () => {
        const editor = quillRef.current?.getEditor()
        if(!editor){
            console.error("Quill Editor not found!")
        }
        const quillDelta = editor?.getContents()
        exportDOCX(quillDelta)
    }

    return (
        <Container className="d-flex flex-grow-1 flex-column">
            <Row id="editor-save" className="flex-shrink-0">
                <Col className="d-flex p-1 justify-content-center">
                    <Button variant="light" className="btn-outline-danger">                
                        <Image src={pdf} onClick={handleExportPDF} roundedCircle/>
                    </Button>
                </Col>
                <Col className="d-flex p-1 justify-content-center">                
                    <Button variant="light" className="btn-outline-primary">
                        <Image src={docx} onClick={handleExportDOCX} roundedCircle/>
                    </Button>
                </Col>
            </Row>
            <Row id="editor-quill" className="flex-grow-1 d-flex overflow-auto">
                <ReactQuill theme="snow" className="bg-light-subtle d-flex flex-column p-2" ref={quillRef} onChange={handleChangeDocument}/>
            </Row>
        </Container>
    )
} 