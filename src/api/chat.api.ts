import axios from "axios"
import { IMessage } from "../components/chatbox"
import { CHAT_ENDPOINT } from "../config"

export default async function chatResponse(messages: IMessage[]): Promise<string> {   
    const payload = {messages: messages}
    const response = (await axios.post(CHAT_ENDPOINT, payload)).data
    return response.payload
}
