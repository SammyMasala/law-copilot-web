import React, { Context, createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid"; 
import { useNavigate } from 'react-router-dom';

import Header from './components/header';
import Editor from './components/editor';
import Chatbox, { IMessage } from './components/chatbox';
import { getSession, putSession } from './api/sessions.api';
import { AUTOSAVE_INTERVAL } from './config';

interface ISessionProvider{
    children: ReactNode
}

const SessionContext: Context<any> = createContext(null)

const SessionProvider = ({children}: ISessionProvider) => {
    const [id, setID] = useState<string>("")
    const [docHTML, setDocHTML] = useState<string>("")
    const [messages, setMessages] = useState<IMessage[]>([])
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [sessionURL, setSessionURL] = useState<string>("")

    return (
        <SessionContext.Provider value={{
            id, 
            setID, 
            docHTML, 
            setDocHTML, 
            messages, 
            setMessages, 
            isLoaded, 
            setIsLoaded, 
            sessionURL, 
            setSessionURL,
        }}>
            {children}
        </SessionContext.Provider>
    )
}

const HomePage:React.FC = () => {
    const {
        id, 
        setID, 
        docHTML, 
        setDocHTML, 
        messages, 
        setMessages, 
        isLoaded, 
        setIsLoaded,
        sessionURL,
        setSessionURL
    } = useContext(SessionContext)
    const [autosaveTimer, setAutosaveTimer] = useState<number>(0)
    const autosaveInterval = AUTOSAVE_INTERVAL
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const navigate = useNavigate()

    // generate id and set Session URL
    useEffect(() => {
        let id = params.get("id")
        if(!id){
            id = uuidv4()
        }
        setID(id)
        setSessionURL(`${window.location.origin}/?id=${id}`)
    }, [])   
    
    // Nav to Current Session 
    useEffect(() => {
        if (isLoaded){
            navigate(`/?id=${id}`)
        }
    }, [isLoaded])

    // Load Session
    useEffect(() => {
        if(!id){
            return
        }

        getSession(id).catch((err: any) => {
            console.error(err)
        }).then((result: any) => {
            if(!result){
                return
            }
            // Pass values to components
            setDocHTML(result?.doc_html)
            setMessages(result?.messages.map((message: string) => {
                return JSON.parse(message)
            }))
        }).catch((err: any) => {
            console.log(err)
        }).then(() => {
            // Set "Loaded" state
            setIsLoaded(true)
        })      
    }, [id])

    // Autosave
    useEffect(() => {
        const autosave = async () => {
            try{
                console.log("Saving", docHTML)
                const result = await putSession(id, docHTML, messages)
                console.log(result)
            }catch(err){
                console.log(err)
            }finally{
                return
            }
        }
        if(autosaveTimer >= autosaveInterval){
            autosave()
            setAutosaveTimer(0)
        }else{  
            setTimeout(() => {setAutosaveTimer(autosaveTimer + 1)}, 1000)
        }       
    }, [autosaveTimer])

    //DEBUG printing
    useEffect(() => {console.log(autosaveTimer)}, [autosaveTimer])
    useEffect(() => {console.log(messages, docHTML)}, [messages, docHTML])

    return (
        <Container className='bg-dark-subtle d-flex flex-column vh-100 overflow-auto' fluid>
            <Row className="bg-dark text-light flex-shrink-0" id="header">
                <Header context={SessionContext}/>
            </Row>
            <Row className="flex-grow-1" id="content">
                <Col xs={12} md={8} className="d-flex" id="content-editor">
                    <Editor context={SessionContext}/>
                </Col>
                <Col xs={0} md={4} className="d-flex bg-secondary bg-opacity-50" id="content-chatbox">
                    <Chatbox context={SessionContext}/>
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
