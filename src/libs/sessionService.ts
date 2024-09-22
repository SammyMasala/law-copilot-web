import { APIClient, SaveRequest } from "@src/clients/api";
import { API_ENDPOINT } from "@src/config";
import { LoadResponse, SaveResponse, SessionData } from "@src/libs/types";
import { mapAPIResponseToSessionData, mapSessionDataToSaveRequest } from "@src/libs/mapper";

export class SessionService {
    private readonly client = new APIClient({endpoint: API_ENDPOINT});

    async loadSession(id: string):Promise<SessionData>{
        try{
            // USES LEGACY. TO MIGRATE
            const loadResponse:LoadResponse = await this.client.loadLegacy({id})
            return mapAPIResponseToSessionData(loadResponse);
        }catch(error){
            throw error;
        }
    }

    async saveSession(data: SessionData):Promise<any>{
        try{
            // USES LEGACY. TO MIGRATE
            const saveRequest:SaveRequest = mapSessionDataToSaveRequest(data);
            const saveResponse:SaveResponse = await this.client.saveLegacy(saveRequest);
            return saveResponse
        }catch(error){
            throw error;
        }
    }

}