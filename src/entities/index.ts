import { NoteNodeType } from "./notes";

// chat
export type ChatMessage = {
    message: string;
    isUser: boolean;
}

export type SessionData = {
    docHTML: string,
    messages: ChatMessage[],
    noteNodes: NoteNodeType[]
}