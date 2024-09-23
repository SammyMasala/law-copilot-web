export enum API_ROUTES {
    CHAT =  "chat",
    SUBJECT = "subject",
    SESSION = "session",
}

// Legacy
export const LEGACY_CHAT_ENDPOINT = process.env.CHAT_ENDPOINT || "https://localhost:8080"
export const LEGACY_SESSION_GET_ENDPOINT = process.env.SESSION_GET_ENDPOINT || "https://localhost:8080"
export const LEGACY_SESSION_PUT_ENDPOINT = process.env.SESSION_PUT_ENDPOINT || "https://localhost:8080"
