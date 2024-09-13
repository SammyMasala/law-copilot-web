import React, { Context, createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { getSession, putSession } from './api/sessions.api';
import { AUTOSAVE_INTERVAL } from './config';
import { Board, Note } from './components/board';
import { Message } from './components/chatbox';
import { Header } from './components/header';
import { Editor } from './components/editor';
import { randomId } from './utils/randomId';
import { NoteNode } from './components/board/noteNode';
import { SessionData } from './api/types.api';

interface ISessionProvider{
    children: ReactNode
}

const SessionContext: Context<any> = createContext(null)

const SessionProvider = ({children}: ISessionProvider) => {
    const initialMessage: Message = { 
        message: "Hi, I am your assistant. I am powered by Mistral.AI. Ask me anything!", 
        isUser: false
    }

    const [id, setID] = useState<string>("")
    const [docHTML, setDocHTML] = useState<string>("")
    const [noteNodes, setNoteNodes] = useState<NoteNode[]>([])
    const [messages, setMessages] = useState<Message[]>([initialMessage])
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [sessionURL, setSessionURL] = useState<string>("")
    const [autosaveTimer, setAutosaveTimer] = useState<number>(AUTOSAVE_INTERVAL)


    const autosave = async () => {
        try{
            console.log("Saving", docHTML)
            const result = await putSession({id, docHTML, noteNodes, messages})
            console.log(result)
        }catch(err){
            console.log(err)
        }finally{
            setAutosaveTimer(AUTOSAVE_INTERVAL)
        }
    }

    return (
        <SessionContext.Provider value={{
            id, 
            setID, 
            docHTML, 
            setDocHTML, 
            noteNodes,
            setNoteNodes,
            messages, 
            setMessages, 
            isLoaded, 
            setIsLoaded, 
            sessionURL, 
            setSessionURL,
            autosaveTimer,
            setAutosaveTimer,
            autosave,
        }}>
            {children}
        </SessionContext.Provider>
    )
}

const HomePage:React.FC = () => {
    const {
        id, 
        setID, 
        setDocHTML, 
        setNoteNodes,
        setMessages, 
        isLoaded, 
        setIsLoaded,
        setSessionURL,
        autosaveTimer,
        setAutosaveTimer,
        autosave,
    } = useContext(SessionContext)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const navigate = useNavigate()

    // generate id and set Session URL
    useEffect(() => {
        let id = params.get("id")
        if(!id){
            id = randomId(10)
        }
        setID(id)
        setSessionURL(`${window.location.origin}/?id=${id}`)
    }, [])   
    
    //Autosave timer
    useEffect(() => {
        const interval = setInterval(() => {
            setAutosaveTimer((prev: number) => {
                return prev - 1                
            })         
        }, 1000)        
        return () => clearInterval(interval)
    },[]) 

    // Autosave
    useEffect(() => {
        if(autosaveTimer <= 0){
            autosave()
        }
    }, [autosaveTimer])

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
        }).then((result) => {
            if(!result){
                return
            }
            // Pass values to components
            setDocHTML(result.docHTML)
            if(result.messages){
                setMessages(result.messages.map((message: string) => {
                    return JSON.parse(message)
                }))
            }
            if(result.noteNodes){
                setNoteNodes(result.noteNodes.map((node: string) => {
                    return JSON.parse(node)
                }))
            }
        }).catch((err: any) => {
            console.log(err)
        }).then(() => {
            // Set "Loaded" state
            setIsLoaded(true)
        })      
    }, [id])

    // //DEBUG printing
    // useEffect(() => {console.log(autosaveTimer)}, [autosaveTimer])
    // useEffect(() => {console.log(messages, docHTML)}, [messages, docHTML])

    return (
        <Container className='bg-dark-subtle d-flex flex-column vh-100 overflow-auto' fluid>
            <Row className="bg-dark text-light flex-shrink-0" id="header">
                <Header context={SessionContext}/>
            </Row>
            <Row className="flex-grow-1" id="content">
                <Col xs={12} md={8} className="d-flex" id="content-graph">
                    <Board context={SessionContext}/>
                </Col>
                <Col xs={0} md={4} className="d-flex" id="content-editor">
                    <Editor context={SessionContext}/>
                </Col>
                {/* <Col xs={0} md={4} className="d-flex bg-secondary bg-opacity-50" id="content-chatbox">
                    <Chatbox context={SessionContext}/>
                </Col> */}
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
