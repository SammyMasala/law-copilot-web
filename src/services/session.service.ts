import { APIClient } from "@src/clients/api";
import { LoadResponse, SaveRequest, SaveResponse } from "@src/clients/api/dtos";
import { Session } from "@src/clients/api/entities";
import { API_ENDPOINT } from "@src/config";
import { ChatMessage, SessionData } from "@src/entities";
import { NoteNodeType } from "@src/entities/notes";
import { SessionMapper } from "@src/mappers";

export interface ISessionService {
    loadSession(id: string): Promise<SessionData | null>
    saveSession(id: string, sessionData: SessionData): Promise<any>
}

export class SessionService implements ISessionService{
    private readonly client = new APIClient({endpoint: API_ENDPOINT});

    async loadSession(id: string):Promise<SessionData | null>{
        try{
            const loadResponse:LoadResponse = await this.client.load({id})
            return loadResponse? SessionMapper.mapSessionToSessionData(loadResponse.session) : null
        }catch(error){
            throw error;
        }
    }

    async saveSession(id: string, sessionData: SessionData):Promise<any>{
        try{
            const saveRequest:SaveRequest = { 
                id, 
                session: SessionMapper.mapSessionDataToSession(sessionData)
            };
            const saveResponse:SaveResponse = await this.client.save(saveRequest);
            return saveResponse
        }catch(error){
            throw error;
        }
    }

}