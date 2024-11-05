import axios from "axios";
import { API_ROUTES, CHAT_ROUTES, LEGACY_CHAT_ENDPOINT, LEGACY_SESSION_GET_ENDPOINT, LEGACY_SESSION_PUT_ENDPOINT, SESSION_ROUTES } from "./config";
import { AskLawRequest, AskLawResponse, ChatRequest, ChatResponse, LegacyChatRequest, LegacyChatResponse, LegacyLoadResponse, LegacySaveRequest, LoadRequest, LoadResponse, SaveRequest, SaveResponse } from "./dtos";

export class APIClient {
    private readonly endpoint: string;

    constructor(config: {endpoint: string}){
        this.endpoint = config.endpoint;
    }

    async chat(request: ChatRequest): Promise<ChatResponse>{
        try{
            const response: ChatResponse = (await axios.post(`${this.endpoint}${API_ROUTES.CHAT}${CHAT_ROUTES.CONVERSATION}`, request)).data;   
            return response;         
        }catch(error){
            throw error;
        }
    } 

    async ask_law(request: AskLawRequest): Promise<AskLawResponse>{
        try{
            const response: AskLawResponse = (await axios.post(`${this.endpoint}${API_ROUTES.CHAT}${CHAT_ROUTES.ASK_LAW}`, request)).data;   
            return response;         
        }catch(error){
            throw error;
        }
    }

    async load(params: LoadRequest): Promise<LoadResponse>{
        try{
            const response: LoadResponse = (await axios.get(`${this.endpoint}${API_ROUTES.SESSION}${SESSION_ROUTES.LOAD}/${params.id}`)).data;   
            return response;         
        }catch(error){
            throw error;
        }
    }

    async save(data: SaveRequest): Promise<SaveResponse>{
        try{
            const response: SaveResponse = (await axios.patch(`${this.endpoint}${API_ROUTES.SESSION}${SESSION_ROUTES.SAVE}/${data.id}`, data)).data;   
            return response;         
        }catch(error){
            throw error;
        }
    }

    // Legacy API
    async chatLegacy(request: LegacyChatRequest): Promise<LegacyChatResponse>{
        try{
            const response: LegacyChatResponse = (await axios.post(LEGACY_CHAT_ENDPOINT, request)).data;   
            return response;         
        }catch(error){
            throw error;
        }
    }

    async loadLegacy(params: LoadRequest): Promise<LegacyLoadResponse>{
        try{
            const response: LegacyLoadResponse = (await axios.get(`${LEGACY_SESSION_GET_ENDPOINT}?session_id=${params.id}`)).data;   
            return response;         
        }catch(error){
            throw error;
        }
    }

    async saveLegacy(data: LegacySaveRequest): Promise<SaveResponse>{
        try{
            const response: SaveResponse = (await axios.post(`${LEGACY_SESSION_PUT_ENDPOINT}`, data)).data;   
            return response;         
        }catch(error){
            throw error;
        }
    }
}

(async() => {
    const client = new APIClient({endpoint: "https://jt9sn0g75c.execute-api.ap-southeast-1.amazonaws.com/stg"})
})()