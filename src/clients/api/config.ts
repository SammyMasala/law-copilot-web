export enum API_ROUTES {
    CHAT =  "/chat",
    SESSION = "/session",
}

export enum CHAT_ROUTES {
    CONVERSATION = "",
    ASK_LAW = "/law"
}

export enum SESSION_ROUTES {
    SAVE = "",
    LOAD = ""
}

// Legacy
export const LEGACY_CHAT_ENDPOINT = process.env.CHAT_ENDPOINT || "https://localhost:8080"
export const LEGACY_SESSION_GET_ENDPOINT = process.env.SESSION_GET_ENDPOINT || "https://localhost:8080"
export const LEGACY_SESSION_PUT_ENDPOINT = process.env.SESSION_PUT_ENDPOINT || "https://localhost:8080"
