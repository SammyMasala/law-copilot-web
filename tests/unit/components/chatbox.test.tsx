import React, { createContext, useState } from "react";
import "@testing-library/jest-dom"
import {render, screen, cleanup} from "@testing-library/react"
import Chatbox from "../../../src/components/Chatbox";
import { IMessage } from "../../../src/components/Chatbox";

afterEach(()=> {
    cleanup();
})

describe("Header Component", () => {
    const mockContext:React.Context<any> = createContext(null)
    const mockMessages:IMessage[] = [{message: "test message", isUser: false}]
    const MockContextProvider = ({children}: any) => {
        const [messages, setMessages] = useState<IMessage[]>(mockMessages)
        const [isLoaded, setIsLoaded] = useState<boolean>(true)
        return (
            <mockContext.Provider 
                value={{messages, setMessages, isLoaded}}>
                    {children}
            </mockContext.Provider>
        )
    }


    test("initial state", async () => {
        const TestComponent:React.FC = () => {
            return (
                <MockContextProvider>
                    <Chatbox context={mockContext}/>
                </MockContextProvider>
            )
        }     
    
        render(<TestComponent />)
        const title = screen.getByText("test message")
        expect(title).toBeInTheDocument();
    })

    test("snapshot", () => {   
        const TestComponent:React.FC = () => {
            return (
                <MockContextProvider>
                    <Chatbox context={mockContext}/>
                </MockContextProvider>
            )
        }     
    
        const {asFragment} = render(<TestComponent />)
        expect(asFragment()).toMatchSnapshot();
    })
})