import { Node } from "@xyflow/react"

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
    id: string,
    note: Note;
    deleteNote: (id: string) => void;
}

export type NoteNodeType = Node<NoteNodeData, "noteNode">
