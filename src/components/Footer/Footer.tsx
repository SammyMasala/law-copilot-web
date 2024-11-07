import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image"
import { Button } from "react-bootstrap";

import docx from "@src/static/icons8-docx-50.png";
import pdf from "@src/static/icons8-pdf-50.png";
import { exportDOCX, exportPDF } from "@src/libs/exportFile";


export type FooterProps = {
    context: React.Context<any>
}

export const Footer: React.FC<FooterProps> = (props: FooterProps) => {
    const {context} = props
    const {sessionURL, docHTML} = useContext(context)

    const handleExportPDF = () => {
        exportPDF(docHTML);
    }

    const handleExportDOCX = () => {
        // const editor = quillRef.current?.getEditor()
        // if(!editor){
        //     console.error("Quill Editor not found!")
        // }
        // const quillDelta = editor?.getContents()
        // exportDOCX(quillDelta)
    }


    return (
        <Container fluid>
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
        </Container>
    )
}