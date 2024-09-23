import { APIClient, ChatRequest, ChatResponse, LegacyChatResponse } from "@src/clients/api";
import { API_ENDPOINT } from "@src/config";
import { Message, SubjectData } from "@src/libs/types";
import { SubjectNotLawError } from "@src/errors";
import { mapChatResponseToMessage, mapMessagesToChatRequest, mapSubjectResponseToSubjectData } from "@src/mappers";

export interface IChatService {
    chatQuery(messages: Message[]): Promise<Message>
    subjectQuery(messages:Message[]): Promise<SubjectData>
}

export class ChatService implements IChatService {
    private readonly client = new APIClient({endpoint: API_ENDPOINT});

    async chatQuery(messages:Message[]): Promise<Message>{
        try{
            const chatRequest: ChatRequest = mapMessagesToChatRequest(messages);
            const chatResponse: ChatResponse = await this.client.chat(chatRequest)

            const message = mapChatResponseToMessage(chatResponse)
            return message;
        }catch(error){
            throw error;
        }
    }

    async subjectQuery(messages:Message[]): Promise<SubjectData>{
        try{
            // LEGACY. TO MIGRATE
            const chatRequest = mapMessagesToChatRequest(messages);
            const subjectResponse: LegacyChatResponse = await this.client.subjectLegacy(chatRequest)
            const parsedResponse = JSON.parse(subjectResponse)
            const subjectData: SubjectData = mapSubjectResponseToSubjectData(parsedResponse)
            if(!subjectData.isLaw){
                throw new SubjectNotLawError();
            }
            return subjectData
        }catch(error){
            throw error;
        }
    }
}