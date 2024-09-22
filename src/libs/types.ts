import { NoteNode } from "@src/components/Board/backup/noteNode"
import { Message } from "@src/components/Chatbox"

// general
export type ApiResponse = {
    is_success: boolean,
    message?: string
}

export type SessionData = {
    sessionID: string,
    docHTML: string,
    noteNodes?: NoteNode[]

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