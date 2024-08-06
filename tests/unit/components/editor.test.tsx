import React, { createContext, useState } from "react";
import "@testing-library/jest-dom"
import {render, screen, cleanup} from "@testing-library/react"
import Editor from "../../../src/components/editor";

afterEach(()=> {
    cleanup();
})

describe("Header Component", () => {
    const mockContext:React.Context<any> = createContext(null)
    const mockDocHTML = "<p>this is a test doc</p>"
    const MockContextProvider = ({children}: any) => {
        const [docHTML, setDocHTML] = useState<string>(mockDocHTML)
        const [isLoaded, setIsLoaded] = useState<boolean>(true)
        return (
            <mockContext.Provider 
                value={{docHTML, setDocHTML, isLoaded}}>
                    {children}
            </mockContext.Provider>
        )
    }


    test("initial state", async () => {
        const TestComponent:React.FC = () => {
            return (
                <MockContextProvider>
                    <Editor context={mockContext}/>
                </MockContextProvider>
            )
        }     
    
        render(<TestComponent />)
        const title = screen.getByText("this is a test doc")
        expect(title).toBeInTheDocument();
    })

    test("snapshot", () => {   
        const TestComponent:React.FC = () => {
            return (
                <MockContextProvider>
                    <Editor context={mockContext}/>
                </MockContextProvider>
            )
        }     
    
        const {asFragment} = render(<TestComponent />)
        expect(asFragment()).toMatchSnapshot();
    })
})