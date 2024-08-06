import React, { createContext, useState } from "react";
import "@testing-library/jest-dom"
import {render, screen, cleanup} from "@testing-library/react"
import Header from "../../../src/components/header";

afterEach(()=> {
    cleanup();
})

describe("Header Component", () => {
    const mockContext = createContext<any>(null)
    const MockContextProvider = ({children}: any) => {
        const [sessionURL, setSessionURL] = useState<string>("https://www.test.com")
        return (
            <mockContext.Provider 
                value={sessionURL}>
            </mockContext.Provider>
        )
    }
    const TestComponent = () => {
        return (
            <MockContextProvider>
                <Header />
            </MockContextProvider>
        )
    }

    test("initial state", () => {
        render(<TestComponent />)
        console.log(screen)
        const title = screen.getByText("Copilot")
        expect(title).toBeInTheDocument();
    })
})