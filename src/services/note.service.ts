import { Note, NoteNodeType, SubjectData } from "@src/entities/notes"
import { NotesMapper } from "@src/mappers"

export interface INoteService{
    initialNote(deleteFunc: (id:string) => void): NoteNodeType
    createNote(subjectData: SubjectData, deleteFunc: (id:string) => void): NoteNodeType
}

export class NoteService implements INoteService{
    initialNote(deleteFunc: (id:string) => void): NoteNodeType {
        const initialNote: Note = {
            subject: "This is a Note!",
            content: {
                "Introduction": "This is a note card. All created notes will come in this form",
                "How to Use" : "Search a law subject above and a note will be created :D",
                "Details": "Subject information has been focused on the most valuable: insights, important quotes etc",
                "Controls": "1. Click the title to collapse the content for navigation \n 2. Click the X to delete the note"
            }
        }

        return NotesMapper.mapNotetoNoteNodeType(initialNote, deleteFunc)
    }

    createNote(subjectData: SubjectData, deleteFunc: (id:string) => void): NoteNodeType { 
        const newNote: Note = NotesMapper.mapSubjectDatatoNote(subjectData)
        return NotesMapper.mapNotetoNoteNodeType(newNote, deleteFunc)
    }
}