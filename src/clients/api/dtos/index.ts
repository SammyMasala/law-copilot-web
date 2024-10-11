// Create a request & response type for each 

import { LegacyMessage, Message } from "../entities/message.entity"
import { LegacySession, Session } from "../entities/session.entity"

// general
export type ApiResponse = {
    is_success: boolean,
    failed_message?: string
}

// chat
export type ChatRequest = {
    messages: Message[]
}
export type ChatResponse = {
    reply: string
} & ApiResponse 

// ask_law
export type AskLawRequest = {
    message: Message
}
export type AskLawResponse = {
    reply: Record<string, any>
} & ApiResponse 

// load
export type LoadRequest = {
    id: string
}
export type LoadResponse = {
    session: Session
} & ApiResponse

// save
export type SaveRequest = {
    id: string
    session: Session
}
export type SaveResponse = {
    reply: string
} & ApiResponse

// legacy
export type LegacyApiResponse = {
    message: string,
    status: string
}

export type LegacyChatRequest = {
    messages: LegacyMessage[]
}

export type LegacyChatResponse = {
    payload: string 
} & LegacyApiResponse

export type LegacyLoadResponse = {
    payload: LegacySession
} & LegacyApiResponse

export type LegacySaveRequest = {
    session: LegacySession
}

