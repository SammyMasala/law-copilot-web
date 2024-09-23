import React, { Context, createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { AUTOSAVE_INTERVAL, INITIAL_MESSAGE } from '@src/config';
import { Header } from '@src/components/Header';
import { Editor } from '@src/components/Editor';
import { randomId } from '@src/utils/randomId';
import { Message, NoteNode } from '@src/libs';
import { SessionData, SubjectData } from '@src/libs';
import { Board } from '@src/components/Board';
import { ChatService, SessionService } from '@src/services';

interface ISessionProvider{
    children: ReactNode
}

const SessionContext: Context<any> = createContext(null)

const SessionProvider = ({children}: ISessionProvider) => {
    const sessionService = new SessionService();
    const chatService = new ChatService();

    const [sessionID, setSessionID] = useState<string>("")
    const [docHTML, setDocHTML] = useState<string>("")
    const [noteNodes, setNoteNodes] = useState<NoteNode[]>([])
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [sessionURL, setSessionURL] = useState<string>("")
    const [autosaveTimer, setAutosaveTimer] = useState<number>(AUTOSAVE_INTERVAL)

    // FUNCTIONS

    // LOADING & SAVING
    async function saveSession(): Promise<void> {
        try{
            console.log("Saving session:", sessionID)
            const result = await sessionService.saveSession({
                sessionID, docHTML, noteNodes, messages
            })
            console.log(result)
        }catch (error){
            console.error(error);
        }finally{
            setAutosaveTimer(AUTOSAVE_INTERVAL)
        }
    }

    async function loadSession():Promise<void> {
        try{
            console.log("Loading Session:", sessionID)

            //Load Session
            const sessionData:SessionData | null = await sessionService.loadSession(sessionID)

            console.log(sessionData)

            // Pass values to components
            if(sessionData?.docHTML){
                setDocHTML(sessionData.docHTML)
            }
            if(sessionData?.messages){
                setMessages(sessionData.messages)
            }
            if(sessionData?.noteNodes){
                setNoteNodes(sessionData.noteNodes)
            }
        }catch(error){
            console.error(error);
        }
    }

    // SUBMIT MESSAGES TO CHAT API
    async function loadNewSubject(): Promise<void>{
        try{
            console.log("Sending Messages:", messages)
            const subjectData:SubjectData | null = await chatService.subjectQuery(messages.slice(-1));

            console.log(subjectData)
        }catch (error){
            console.error(error);
        }
    }

    return (
        <SessionContext.Provider value={{
            sessionID, 
            setSessionID, 
            docHTML, 
            setDocHTML, 
            noteNodes,
            setNoteNodes,
            messages, 
            setMessages, 
            loadNewSubject,
            isLoaded, 
            setIsLoaded, 
            sessionURL, 
            setSessionURL,
            saveSession,
            loadSession,
            autosaveTimer,
            setAutosaveTimer
        }}>
            {children}
        </SessionContext.Provider>
    )
}

const HomePage:React.FC = () => {
    const {
        sessionID, 
        setSessionID, 
        isLoaded, 
        setIsLoaded,
        setSessionURL,
        saveSession,
        loadSession,
        autosaveTimer,
        setAutosaveTimer
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
        setSessionID(id)
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
            saveSession()
        }
    }, [autosaveTimer])

    // Nav to Current Session 
    useEffect(() => {
        if (isLoaded){
            navigate(`/?id=${sessionID}`)
        }
    }, [isLoaded])

    // Load Session
    useEffect(() => {
        if(!sessionID){
            return
        }

        loadSession(sessionID).then(() => {
            // Set "Loaded" state
            setIsLoaded(true)
        })      
    }, [sessionID])

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
