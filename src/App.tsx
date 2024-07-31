import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid"; 

import github from './static/icons8-github-25.png'
import Header from './components/header';
import Editor from './components/editor';
import Chatbox, { IMessage } from './components/chatbox';
import { getSession, putSession } from './api/sessions.api';

const HomePage:React.FC = () => {
    const [document, setDocument] = useState<string>("")
    const [messages, setMessages] = useState<IMessage[]>([])
    const [id, setID] = useState<string>("")
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    
    useEffect(() => {
        let id = params.get("id")
        if(!id){
            id = uuidv4()
        }
        setID(id)
    }, [])

    useEffect(() => {
        const load = async(id: string) => {
            return await getSession(id)
        }
        if(id){
            load(id).catch(err => {console.log(err)}).then(result => {
                console.log(result)
                // TODO pass values to components
            })
        }
    }, [id])

    useEffect(() => {
        if (!id || !document || !messages.length){
            return
        }
        const save = async(id: string, docHTML: string, messages: IMessage[]) => {
            return await putSession(id, docHTML, messages)
        }
        if(id){
            save(id, document, messages).catch(err => {console.log(err)}).then(result => {
                console.log(result)
                // TODO pass values to components
            })
        } 

    }, [messages, document])
    return (
        <Container className='bg-dark-subtle d-flex flex-column vh-100 overflow-auto' fluid>
            <Row className="bg-dark text-light flex-shrink-0" id="header">
                <Header />
            </Row>
            <Row className="flex-grow-1" id="content">
                <Col xs={12} md={8} className="d-flex" id="content-editor">
                    <Editor onChange={setDocument}/>
                </Col>
                <Col xs={0} md={4} className="d-flex bg-secondary bg-opacity-50" id="content-chatbox">
                    <Chatbox onChange={setMessages}/>
                </Col>
            </Row>
        </Container>
    ) 
}

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />}/>
            </Routes>
        </Router>
    )
}

export default App;