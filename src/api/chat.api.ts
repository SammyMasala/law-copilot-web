import axios from "axios"
import { CHAT_ENDPOINT } from "../config"
import { Message } from "../components/chatbox/types"
import { mapResponseToSubjectData } from "./mapper"
import { SubjectData } from "./types.api"

export default async function chatResponse(messages: Message[]): Promise<SubjectData | null> {   
    const payload = {messages: messages}
    const response = (await axios.post(CHAT_ENDPOINT, payload)).data
    const responseData = JSON.parse(response.payload)
    return responseData ? mapResponseToSubjectData(responseData) : null
}
