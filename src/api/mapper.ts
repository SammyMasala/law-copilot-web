import { SessionData, SubjectData } from "./types.api";

export function mapResponseToSessionData(response: any): SessionData{
    const data: SessionData = {
        docHTML: response.doc_html,
        id: response.id,
        messages: response.messages,
        noteNodes: response.note_nodes
    }
    return data
}

export function mapResponseToSubjectData(response: any): SubjectData{
    const {subject, related, ...rest} = response
    const data: SubjectData = {
        subject: subject,
        content: rest,
        related: related,
    }
    return data

}