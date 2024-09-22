import axios from "axios";
import { API_ROUTES, LEGACY_CHAT_ENDPOINT, LEGACY_SESSION_GET_ENDPOINT, LEGACY_SESSION_PUT_ENDPOINT } from "./config";
import { ChatRequest, ChatResponse, LoadRequest, LoadResponse, SaveRequest, SaveResponse } from "./types";

export class APIClient {
    private readonly endpoint: string;

    constructor(config: {endpoint: string}){
        this.endpoint = config.endpoint;
    }

    async chat(request: ChatRequest): Promise<ChatResponse>{
        try{
            const response = (await axios.post(`${this.endpoint}/${API_ROUTES.CHAT}`, request)).data;   
            return response as ChatResponse;         
        }catch(error){
            throw error;
        }
    }

    async load(params: LoadRequest): Promise<LoadResponse>{
        try{
            const response = (await axios.get(`${this.endpoint}/${API_ROUTES.SESSION}/${params.id}`)).data;   
            return response as LoadResponse;         
        }catch(error){
            throw error;
        }
    }

    async save(data: SaveRequest): Promise<SaveResponse>{
        try{
            const response = (await axios.post(`${this.endpoint}/${API_ROUTES.SESSION}`, data)).data;   
            return response as SaveResponse;         
        }catch(error){
            throw error;
        }
    }

    // Legacy API
    async chatLegacy(request: ChatRequest): Promise<ChatResponse>{
        try{
            const response = (await axios.post(LEGACY_CHAT_ENDPOINT, request)).data;   
            return response as ChatResponse;         
        }catch(error){
            throw error;
        }
    }

    async loadLegacy(params: LoadRequest): Promise<LoadResponse>{
        try{
            const response = (await axios.get(`${LEGACY_SESSION_GET_ENDPOINT}?session_id=${params.id}`)).data.payload;   
            return response as LoadResponse;         
        }catch(error){
            throw error;
        }
    }

    async saveLegacy(data: SaveRequest): Promise<SaveResponse>{
        try{
            const saveRequest = {
                session: data
            }
            const response = (await axios.post(`${LEGACY_SESSION_PUT_ENDPOINT}`, saveRequest)).data;   
            return response as SaveResponse;         
        }catch(error){
            throw error;
        }
    }

}