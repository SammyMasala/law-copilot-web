import { APIClient} from "@src/clients/api";
import { API_ENDPOINT } from "@src/config";
import { SubjectNotLawError } from "@src/errors";
import { ChatMessage } from "@src/entities";
import { AskLawRequest, AskLawResponse } from "@src/clients/api/dtos";
import { ChatMapper, NotesMapper } from "@src/mappers";
import { SubjectData } from "@src/entities/notes";

export interface IChatService {
    chatQuery(messages: ChatMessage[]): Promise<ChatMessage>
    lawQuery(message:ChatMessage): Promise<SubjectData>
}

export class ChatService implements IChatService {
    private readonly apiClient = new APIClient({endpoint: API_ENDPOINT});

    async chatQuery(messages:ChatMessage[]): Promise<ChatMessage>{
        try{
            const chatRequest = ChatMapper.mapMessagesToChatRequest(messages);

            const response = await this.apiClient.chat(chatRequest)
            const reply = response.reply

            return ChatMapper.mapReplyToMessage(reply);
        }catch(error){
            throw error;
        }
    }

    async lawQuery(message:ChatMessage): Promise<SubjectData>{
        try{
            const askLawRequest: AskLawRequest = {
                message: ChatMapper.mapChatMessageToApiMessage(message)
            };
            const response: AskLawResponse = await this.apiClient.ask_law(askLawRequest)

            const subjectData: SubjectData = NotesMapper.mapClientDataToSubjectData(response.reply)
            
            if(!subjectData.isLaw){
                throw new SubjectNotLawError();
            }
            return subjectData
        }catch(error){
            throw error;
        }
    }
}