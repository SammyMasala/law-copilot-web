import axios from "axios"
import { Message } from "../components/chatbox"
import { SESSION_GET_ENDPOINT, SESSION_PUT_ENDPOINT } from "../config"
import { SessionData } from "./types.api"
import { mapResponseToSessionData } from "./mapper"

export const getSession = async (id: string) => {
    const response = (await axios.get(`${SESSION_GET_ENDPOINT}?session_id=${id}`)).data
    console.log(response)
    return response.payload ? mapResponseToSessionData(response.payload) : undefined
}

export const putSession = async (data: SessionData) => {
    const payload = {
        session: {
            id: data.id,
            doc_html: data.docHTML,
            note_nodes: data.noteNodes?.map(node => JSON.stringify(node)),
            messages: data.messages.map(message => JSON.stringify(message))
        }
    }
    console.log(payload)
    const response = (await axios.post(SESSION_PUT_ENDPOINT, payload)).status
    return response
}