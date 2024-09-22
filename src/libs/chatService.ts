import { APIClient } from "@src/clients/api";
import { Message } from "@src/components/Chatbox";
import { API_ENDPOINT } from "@src/config";

export class ChatService {
    private readonly client = new APIClient({endpoint: API_ENDPOINT});

    async chatResponse(messages:Message[]){
        try{
            return this.client.chat({messages})
        }catch(error){
            throw error;
        }
    }

    // Legacy
}