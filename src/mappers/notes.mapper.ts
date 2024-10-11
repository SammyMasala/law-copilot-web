import { SubjectResponse } from "@src/clients/api";
import { Note, NoteNodeType, SubjectData } from "@src/libs"
import { randomId } from "@src/utils/randomId";
import { snakeCaseToCapitalized } from "@src/utils/snakeCaseToCapitalized";

export function mapNotetoNoteNodeType(noteData: Note, deleteFunc: (id: string) => void): NoteNodeType {
    const noteID = randomId(6);
    const noteNode: NoteNodeType = {
        id: noteID,
        position: {x:100, y: 0},
        data: {
            id: noteID,
            note: noteData,
            deleteNote: deleteFunc
        },
        type: "noteNode"
    }

    return noteNode;
}

export function mapSubjectDatatoNote(subjectData: SubjectData): Note {
    const note: Note = {
        subject: subjectData.subject,
        content: subjectData.content
    }
    return note;
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