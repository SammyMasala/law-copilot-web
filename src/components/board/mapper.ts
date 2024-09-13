import { Note } from "./types";
import { Node } from "@xyflow/react";
import { randomId } from "@src/utils/randomId";

export function mapNotetoNoteNode(note: Note, deleteFunc: (id:string) => void):Node{
    const id = randomId(6)

    const noteNode: Node = {
        id: id,
        position: { x: 100, y: 0 },
        data: {
            note: note,
            deleteNote: deleteFunc
        },
        type: "noteNode"
    }
    return noteNode;
}