import { Node, NodeProps } from "@xyflow/react";

export type Note = {
    subject: string;
    content: Record<string, string>;
    related?: string[]
}

export type NoteNodeData = {
    note: Note;
    deleteNote: (id: string) => void;
}

export type NoteNode = Node<NoteNodeData, "NoteNodeData">
