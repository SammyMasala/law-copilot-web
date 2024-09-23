import { Node } from "@xyflow/react"

// general
export type ApiResponse = {
    is_success: boolean,
    message?: string
}

export type SessionData = {
    sessionID: string,
    docHTML: string,
    noteNodes?: any[]

    // LEGACY
    messages?: Message[]
}

// load
export type LoadResponse = {
    id: string,
    doc_html: string,
    note_nodes?: string[],

    // LEGACY
    messages?: string[]
} & ApiResponse

// save
export type SaveResponse = ApiResponse

// chat
export type Message = {
    message: string;
    isUser: boolean;
}

// subject
export type SubjectData = {
    subject: string,
    isLaw: boolean,
    content: Record<string, string>
    related?: Record<string, string>[]
}

export type Note = {
    subject: string,
    content: Record<string, string>,
    related?: string[]
}

export type NoteNodeData = {
    note: Note;
    deleteNote: (id: string) => void;
}

export type NoteNode = Node<NoteNodeData, "NoteNodeData">
