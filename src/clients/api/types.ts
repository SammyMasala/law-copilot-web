// Create a request & response type for each 

// general
export type ApiResponse = {
    is_success: boolean,
    message?: string
}

// chat
export type ChatRequest = {
    messages: {isUser: boolean, message: string}[]
}
export type ChatResponse = {
    subject: string
} & ApiResponse & Record<string,any>

// load
export type LoadRequest = {
    id: string
}

export type LoadResponse = {
    id: string,
    note_nodes?: string[],
    doc_html: string,
    
    // Legacy
    messages?: string[]
} & ApiResponse

// save
export type SaveRequest = {
    id: string,
    note_nodes: any[],
    doc_html: string,

    // Legacy
    messages?: any
}

export type SaveResponse = ApiResponse