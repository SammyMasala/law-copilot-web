import axios from "axios";
import { API_ROUTES, CHAT_ROUTES, LEGACY_CHAT_ENDPOINT, LEGACY_SESSION_GET_ENDPOINT, LEGACY_SESSION_PUT_ENDPOINT, SESSION_ROUTES } from "./config";
import { ChatRequest, ChatResponse, LegacyChatResponse, LoadRequest, LoadResponse, SaveRequest, SaveResponse, SubjectResponse } from "./types";

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

    async ask_law(request: ChatRequest): Promise<ChatResponse>{
        try{
            const response: ChatResponse = (await axios.post(`${this.endpoint}${API_ROUTES.CHAT}${CHAT_ROUTES.ASK_LAW}`, request)).data;   
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
    async subjectLegacy(request: ChatRequest): Promise<LegacyChatResponse>{
        try{
            const response: LegacyChatResponse = (await axios.post(LEGACY_CHAT_ENDPOINT, request)).data.payload;   
            return response;         
        }catch(error){
            throw error;
        }
    }

    async loadLegacy(params: LoadRequest): Promise<LoadResponse>{
        try{
            const response: LoadResponse = (await axios.get(`${LEGACY_SESSION_GET_ENDPOINT}?session_id=${params.id}`)).data.payload;   
            return response;         
        }catch(error){
            throw error;
        }
    }

    async saveLegacy(data: SaveRequest): Promise<SaveResponse>{
        try{
            const saveRequest = {
                session: data
            }
            const response: SaveResponse = (await axios.post(`${LEGACY_SESSION_PUT_ENDPOINT}`, saveRequest)).data;   
            return response;         
        }catch(error){
            throw error;
        }
    }

}