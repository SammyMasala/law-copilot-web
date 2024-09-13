import React, { createContext, useState } from "react";
import "@testing-library/jest-dom"
import {render, screen, cleanup} from "@testing-library/react"
import Header from "../../../src/components/header/header";

afterEach(()=> {
    cleanup();
})

describe("Header Component", () => {
    const mockContext:React.Context<any> = createContext(null)
    const MockContextProvider = ({children}: any) => {
        const [sessionURL, setSessionURL] = useState<string>("https://www.test.com")
        return (
            <mockContext.Provider 
                value={{sessionURL}}>
                    {children}
            </mockContext.Provider>
        )
    }
    
    test("initial state", async () => {
        const TestComponent:React.FC = () => {
            return (
                <MockContextProvider>
                    <Header context={mockContext}/>
                </MockContextProvider>
            )
        }
        render(<TestComponent />)
        const title = screen.getByText("Law Copilot")
        expect(title).toBeInTheDocument();
    })

    test("snapshot", () => {   
        const TestComponent:React.FC = () => {
            return (
                <MockContextProvider>
                    <Header context={mockContext}/>
                </MockContextProvider>
            )
        }     
        const {asFragment} = render(<TestComponent />)
        expect(asFragment()).toMatchSnapshot();
    })
})