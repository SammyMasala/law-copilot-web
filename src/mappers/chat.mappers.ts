import { ChatRequest, ChatResponse } from "@src/clients/api/dtos"
import { Message } from "@src/clients/api/entities"
import { ChatMessage } from "@src/entities"

export class ChatMapper{
    static mapMessagesToChatRequest(messages: ChatMessage[]): ChatRequest{
        const chatRequest: ChatRequest = {
            messages: messages.map(message => this.mapChatMessageToApiMessage(message))
        }
        return chatRequest
    }
    
    static mapChatMessageToApiMessage(message: ChatMessage): Message{
        const apiMessage: Message = {
            is_user: message.isUser,
            message: message.message
        }
        return apiMessage
    }
    
    static mapReplyToMessage(reply: string): ChatMessage{
        const message: ChatMessage = {
            isUser: true,
            message: reply
        }
        return message
    } 
}
