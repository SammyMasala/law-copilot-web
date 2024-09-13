export type SessionData = {
    id: string, 
    docHTML: string, 
    noteNodes: any[],
    messages: any[]
}

export type SubjectData = {
    subject: string, 
    content: Record<string, string>, 
    related: any[],
}

