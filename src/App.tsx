import React, { Context, createContext, ReactNode, useContext, useEffect, useState } from 'react';
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

interface ISessionProvider{
    children: ReactNode
}

const SessionContext: Context<any> = createContext(null)

const SessionProvider = ({children}: ISessionProvider) => {
    const [id, setID] = useState<string>("")
    const [docHTML, setDocHTML] = useState<string>("")
    const [messages, setMessages] = useState<IMessage[]>([])

    return (
        <SessionContext.Provider value={{id, setID, docHTML, setDocHTML, messages, setMessages}}>
            {children}
        </SessionContext.Provider>
    )
}

const HomePage:React.FC = () => {
    const {id, setID, docHTML, setDocHTML, messages, setMessages} = useContext(SessionContext)
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
        if (!id || !docHTML || !messages.length){
            return
        }
        const save = async(id: string, docHTML: string, messages: IMessage[]) => {
            return await putSession(id, docHTML, messages)
        }
        if(id){
            save(id, docHTML, messages).catch(err => {console.log(err)}).then(result => {
                console.log(result)
                // TODO pass values to components
            })
        } 

    }, [messages, docHTML])
    return (
        <Container className='bg-dark-subtle d-flex flex-column vh-100 overflow-auto' fluid>
            <Row className="bg-dark text-light flex-shrink-0" id="header">
                <Header />
            </Row>
            <Row className="flex-grow-1" id="content">
                <Col xs={12} md={8} className="d-flex" id="content-editor">
                    <Editor/>
                </Col>
                <Col xs={0} md={4} className="d-flex bg-secondary bg-opacity-50" id="content-chatbox">
                    <Chatbox/>
                </Col>
            </Row>
        </Container>
    ) 
}

const App: React.FC = () => {
    return (
        <SessionProvider>
            <Router>
                <Routes>
                        <Route path='/' element={<HomePage />}/>
                </Routes>
            </Router>
        </SessionProvider>

    )
}

export {App, SessionContext, SessionProvider};
