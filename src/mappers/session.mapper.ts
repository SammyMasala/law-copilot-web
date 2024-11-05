import { Session } from "@src/clients/api/entities";
import { SessionData } from "@src/entities";
import { NoteNodeType } from "@src/entities/notes";

export class SessionMapper {
    static mapSessionToSessionData(session: Session): SessionData{
        return {
            docHTML: session.doc_html,
            messages: session.messages,
            noteNodes: session.note_nodes as NoteNodeType[]
        }
    }

    static mapSessionDataToSession(sessionData: SessionData): Session{
        return {
            doc_html: sessionData.docHTML,
            messages: sessionData.messages,
            note_nodes: sessionData.noteNodes
        }
    }
}