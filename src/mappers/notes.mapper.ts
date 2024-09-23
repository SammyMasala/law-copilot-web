import { SubjectResponse } from "@src/clients/api";
import { Note, NoteNode, SubjectData } from "@src/libs"
import { randomId } from "@src/utils/randomId";
import { snakeCaseToCapitalized } from "@src/utils/snakeCaseToCapitalized";

export function mapNotetoNoteNode(noteData: Note, deleteFunc: (id: string) => void): NoteNode {
    const noteID = randomId(6);
    const noteNode: NoteNode = {
        id: noteID,
        position: {x:100, y: 0},
        data: {
            note: noteData,
            deleteNote: deleteFunc
        },
        type: "NoteNodeData"
    }

    return noteNode;
}

export function mapSubjectResponseToSubjectData(response: SubjectResponse): SubjectData{
    const {subject, related, is_law, ...rest} = response
    const mappedContent: Record<string, string> = {}
    for (const [key, value] of Object.entries(rest) as [string, string][]){
        mappedContent[snakeCaseToCapitalized(key)] = value
    }
    const data: SubjectData = {
        subject: subject,
        isLaw: is_law,
        content: mappedContent,
        related: related,
    }
    return data
}