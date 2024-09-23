import { SaveRequest } from "@src/clients/api"
import { LoadResponse, SessionData } from "@src/libs"

export function mapLoadResponseToSessionData(data: LoadResponse): SessionData{
    const sessionData: SessionData = {
        sessionID: data.id,
        docHTML: data.doc_html,
        messages: data.messages?.map(elem => JSON.parse(elem)),
        noteNodes: data.note_nodes?.map(elem => JSON.parse(elem))
    }
    return sessionData
}

export function mapSessionDataToSaveRequest(sessionData: SessionData): SaveRequest{
    const saveRequest: SaveRequest = {
        doc_html: sessionData.docHTML,
        id: sessionData.sessionID,
        messages: sessionData.messages?.map(elem => JSON.stringify(elem)),
        note_nodes: sessionData.noteNodes?.map(elem => JSON.stringify(elem)) || []
    }
    return saveRequest
}