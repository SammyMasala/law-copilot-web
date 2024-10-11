import { LegacyMessage, Message } from "./message.entity";

export type Session = {
    doc_html: string,
    messages: LegacyMessage[],
    note_nodes: Record<string, any>[],    
}

// Legacy 
export type LegacySession = {
    id: string
    doc_html: string,
    messages: string[],
}