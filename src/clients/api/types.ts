// Create a request & response type for each 

// general
export type ApiResponse = {
    is_success: boolean,
    message?: string
}

// chat
export type ChatRequest = {
    messages: string[]
}
export type ChatResponse = ApiResponse 

// subject
export type SubjectRequest = {
    messages: string[]
}
export type SubjectResponse = ApiResponse & Record<string,any>

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
    note_nodes: string[],
    doc_html: string,

    // Legacy
    messages?: string[]
}
export type SaveResponse = ApiResponse

// LEGACY
export type LegacyChatResponse = string


