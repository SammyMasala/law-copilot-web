import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import trello from "../../static/icons8-trello-25.png"
import github from "../../static/icons8-github-25.png";
import book from "../../static/icons8-book-25.png"
import { AUTOSAVE_INTERVAL, URL_GITHUB, URL_ICONS8, URL_TRELLO } from "../../config";
import { Button } from "react-bootstrap";

interface IHeaderProps {
    context: React.Context<any>
}

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
    const {sessionURL, autosaveTimer, autosave, messages, docHTML, resetTimer} = useContext(props.context)
    const saveButtonRef = useRef<HTMLButtonElement>(null)
    const [saveButtonState, setSaveButtonState] = useState<boolean>(true)

    // Handle autosave state
    useEffect(() => {
        if(saveButtonState){
            saveButtonRef.current!.disabled = false
        }else{
            saveButtonRef.current!.disabled = true
        }
    }, [saveButtonState])

    // Reenable autosave button on changes
    useEffect(() => {
        if(!saveButtonState){
            setSaveButtonState(true)
        }
    }, [messages, docHTML])

    // onClick saveButton
    const handleSaveButtonClicked = () => {
        autosave()    
        setSaveButtonState(false)   
    }

    return (
        <Container fluid>
            <Row className="d-flex">
                <Col className="d-flex justify-content-start">
                    <a href={sessionURL} className="me-1">
                        <Image className="bg-light" src={book} roundedCircle/>
                    </a>
                    <div> Law Copilot </div>
                </Col>
                <Col xs={4} className="d-flex justify-content-center">   
                <Button variant="dark" ref={saveButtonRef} className="pt-0 pb-0 border" onClick={handleSaveButtonClicked}>Autosave in {autosaveTimer}...</Button>
                                 
                </Col>
                <Col className="d-flex justify-content-end">
                    <a href={URL_TRELLO} className="me-1">
                        <Image className="bg-light" src={trello} rounded/>
                    </a>    
                    <a href={URL_GITHUB} className="me-1">
                        <Image className="bg-light" src={github} roundedCircle/>
                    </a>    
                    <div>Icons by:</div>
                    <a href={URL_ICONS8} className="ms-1 me-1">Icon8</a>
                </Col>
            </Row>
            <Row className="d-flex">
                <Col xs={12} className="d-flex justify-content-center">   
                    *** SAVE THIS LINK TO YOUR SESSION ***
                    <a href={sessionURL}>
                        {sessionURL}
                    </a>                 
                </Col>
            </Row>
        </Container>
    )
}

export default Header;