import axios from "axios"
import { IMessage } from "../components/chatbox"
import { SESSION_GET_ENDPOINT, SESSION_PUT_ENDPOINT } from "../config"

export const getSession = async (id: string) => {
    const response = (await axios.get(`${SESSION_GET_ENDPOINT}?session_id=${id}`)).data
    console.log(response)
    return response.payload
}

export const putSession = async (id: string, docHTML: string, messages: IMessage[]) => {
    const payload = {
        session: {
            id: id,
            doc_html: docHTML,
            messages: messages.map(message => JSON.stringify(message))
        }
    }
    const response = (await axios.post(SESSION_PUT_ENDPOINT, payload)).status
    return response
}