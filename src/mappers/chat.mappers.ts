import { ChatRequest, ChatResponse } from "@src/clients/api"
import { Message } from "@src/libs"

export function mapMessagesToChatRequest(messages: Message[]): ChatRequest{
    const chatRequest: ChatRequest = {
        messages
    }
    return chatRequest
}

export function mapChatResponseToMessage(chatResponse: ChatResponse): Message{
    const message: Message = JSON.parse(chatResponse.message!)
    return message
} 