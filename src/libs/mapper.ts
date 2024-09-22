import { snakeCaseToCapitalized } from "@src/utils/snakeCaseToCapitalized";
import { SessionData } from "@src/libs/types";
import { LoadResponse, SaveRequest } from "@src/clients/api";

export function mapAPIResponseToSessionData(data: LoadResponse): SessionData{
    const sessionData: SessionData = {
        sessionID: data.id,
        docHTML: data.doc_html,
        messages: data.messages?.map(elem => JSON.parse(elem)),
        noteNodes: data.note_nodes?.map(elem => JSON.parse(elem))
    }
    return sessionData
}

export function mapSessionDataToSaveRequest(data: SessionData): SaveRequest{
    const saveRequest: SaveRequest = {
        doc_html: data.docHTML,
        id: data.sessionID,
        messages: data.messages?.map(elem => JSON.stringify(elem)),
        note_nodes: data.noteNodes?.map(elem => JSON.stringify(elem)) || []
    }
    return saveRequest
}

// export function mapResponseToSubjectData(response: any): SubjectData{
//     const {subject, related, is_law, ...rest} = response
//     const mappedContent: Record<string, string> = {}
//     for (const [key, value] of Object.entries(rest) as [string, string][]){
//         mappedContent[snakeCaseToCapitalized(key)] = value
//     }
//     const data: SubjectData = {
//         subject: subject,
//         content: mappedContent,
//         related: related,
//     }
//     return data
// }